import { JiraApi } from 'jira';
const jira = new JiraApi('http', 'jira.freewheel.tv', 80, 'deploy', 'uideployzzz', 2);

import db from './bug-bash-db';

var getBugBashes = (ids) => {
  return new Promise((resolve, reject) => {
    db.find({ _id: { $in: ids } }, (err, docs) => {
      if (err) {
        resolve([]);
      } else {
        resolve(docs);
      }
    });
  });
};

var processIssues = (issues, module) => {
  var memberInfos = issues.reduce((prev, cur, index, arr) => {
    var issue = arr[index];
    if (prev[issue.fields.creator.displayName] === undefined) prev[issue.fields.creator.displayName] = { tickets: [] };
    prev[issue.fields.creator.displayName].tickets.push({
      ticket      : issue.key,
      link        : `http://jira.freewheel.tv/browse/${issue.key}`,
      module      : module,
      summary     : issue.fields.summary,
      assignee    : issue.fields.assignee && issue.fields.assignee.displayName,
      status      : issue.fields.status && issue.fields.status.name,
      priority    : issue.fields.priority && issue.fields.priority.id,
      labels      : issue.fields.labels,
      fixVersions : issue.fields.fixVersions && issue.fields.fixVersions.map(vertion => vertion.name),
      resolution  : issue.fields.resolution && issue.fields.resolution.name
    });

    return prev;
  }, {});

  for (let name in memberInfos) {
    memberInfos[name].score = { 1: 0, 2: 0, 3: 0, 4: 0 };
    memberInfos[name].tickets.forEach(ticket => {
      ++memberInfos[name].score[ticket.priority];
    });
    memberInfos[name].score.sum = memberInfos[name].score[1] * 7 + memberInfos[name].score[2] * 3 + memberInfos[name].score[3] * 1 + memberInfos[name].score[4] * 0.5;
  }

  return memberInfos;
};

var getIssues = (docs) => {
  return Promise.resolve(docs.map(doc => {
    var condition = `project = INK and parent = ${doc.ticket} and (created >= "${doc.startTime}" and created <= "${doc.endTime}") and type = "INK Bug (sub-task)" and (status != FINISHED or resolution not in ("Duplicate", "By Design", "Cannot Reproduce"))`;
    return new Promise((resolve, reject) => {
      jira.searchJira(condition, {
        maxResults : 5000,
        fields     : ['summary', 'creator', 'status', 'assignee', 'priority', 'labels', 'fixVersions', 'resolution']
      }, (err, res) => {
        if (err) {
          resolve({});
        } else {
          resolve(processIssues(res.issues, doc.name));
        }
      });
    });
  }));
};

var mergeResults = (results) => {
  var merged = {};
  results.forEach(result => {
    for (var key in result) {
      if (merged[key]) {
        merged[key].tickets = merged[key].tickets.concat(result[key].tickets);
        for (var priority in merged[key].score) {
          merged[key].score[priority] = merged[key].score[priority] + result[key].score[priority];
        }
      } else {
        merged[key] = result[key];
      }
    }
  });
  return merged;
};

export function fetchBugBashData (bugBashIds) {
  return getBugBashes(bugBashIds).then(docs => {
    return getIssues(docs);
  }).then(promiseSet => {
    return Promise.all(promiseSet);
  }).then(results => {
    return Promise.resolve(mergeResults(results));
  });
}
