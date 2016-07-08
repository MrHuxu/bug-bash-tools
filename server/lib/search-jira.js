import { JiraApi } from 'jira';
const jira = new JiraApi('http', 'jira.freewheel.tv', 80, 'deploy', 'uideployzzz', 2);

import db from './bug-bash-db';

var generateJQL = (ids) => {
  return new Promise((resolve, reject) => {
    db.find({ _id: { $in: ids } }, (err, docs) => {
      if (err) {
        resolve('');
      } else {
        resolve(docs.reduce((prev, cur, index, arr) => {
          var doc = arr[index];
          return `${prev} ${index ? 'OR' : ''} (project = INK and parent = ${doc.ticket} and (created >= "${doc.startTime}" and created <= "${doc.endTime}") and type = "INK Bug (sub-task)" and resolution not in ("Duplicate", "By Design", "Cannot Reproduce"))`;
        }, ''));
      }
    });
  });
};

var handleIssues = (issues) => {
  var memberInfos = issues.reduce((prev, cur, index, arr) => {
    var issue = arr[index];
    if (prev[issue.fields.creator.displayName] === undefined) prev[issue.fields.creator.displayName] = { tickets: [] };
    prev[issue.fields.creator.displayName].tickets.push({
      ticket      : issue.key,
      link        : `http://jira.freewheel.tv/browse/${issue.key}`,
      summary     : issue.fields.summary,
      assignee    : issue.fields.assignee && issue.fields.assignee.displayName,
      status      : issue.fields.status && issue.fields.status.name,
      priority    : issue.fields.priority && issue.fields.priority.id,
      labels      : issue.fields.labels,
      fixVersions : issue.fields.fixVersions && issue.fields.fixVersions.map(vertion => vertion.name)
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

export function fetchBugBashData (bugBashIds) {
  return generateJQL(bugBashIds).then((condition) => {
    console.log(`JIRA Search Query:${condition}`);
    if (condition.length) {
      return new Promise((resolve, reject) => {
        jira.searchJira(condition, {
          maxResults : 5000,
          fields     : ['summary', 'creator', 'status', 'assignee', 'priority', 'labels', 'fixVersions']
        }, (err, res) => {
          if (err) {
            resolve({});
          } else {
            resolve(handleIssues(res.issues));
          }
        });
      });
    } else {
      return Promise.resolve({});
    }
  });
}
