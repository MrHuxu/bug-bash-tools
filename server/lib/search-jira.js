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
          return `${prev} ${index ? 'OR' : ''} (project = INK and parent = ${doc.ticket} and (created >= "${doc.startTime}" and created <= "${doc.endTime}"))`;
        }, ''));
      }
    });
  });
};

var handleIssues = (issues) => {
  var nameScores = issues.reduce((prev, cur, index, arr) => {
    var issue = arr[index];
    if (prev[issue.fields.creator.displayName] === undefined) prev[issue.fields.creator.displayName] = {};
    if (prev[issue.fields.creator.displayName][issue.fields.priority.id]) {
      ++prev[issue.fields.creator.displayName][issue.fields.priority.id];
    } else {
      prev[issue.fields.creator.displayName][issue.fields.priority.id] = 1;
    }
    return prev;
  }, {});

  for (let name in nameScores) {
    nameScores[name][1] = nameScores[name][1] || 0;
    nameScores[name][2] = nameScores[name][2] || 0;
    nameScores[name][3] = nameScores[name][3] || 0;
    nameScores[name][4] = nameScores[name][4] || 0;
    nameScores[name].score = nameScores[name][1] * 3 + nameScores[name][2] * 2 + nameScores[name][3] * 1 + nameScores[name][4] * 0.5;
  }

  return nameScores;
};

export function fetchBugBashData (bugBashIds) {
  return generateJQL(bugBashIds).then((condition) => {
    if (condition.length) {
      return new Promise((resolve, reject) => {
        jira.searchJira(condition, {
          maxResults : 5000,
          fields     : ['creator', 'status', 'assignee', 'priority']
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
