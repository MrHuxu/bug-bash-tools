import { JiraApi } from 'jira';
const jira = new JiraApi('http', 'jira.freewheel.tv', 80, 'deploy', 'uideployzzz', 2);

export function fetchBugBashData (bugBash) {
  var condition = `project = INK and parent = ${bugBash.info.ticket} and (created >= "${bugBash.info.startTime}" and created <= "${bugBash.info.endTime}")`;
  console.log(condition);
  return new Promise((resolve, reject) => {
    jira.searchJira(condition, {
      'fields' : ['creator', 'status', 'assignee', 'priority']
    }, (err, res) => {
      var issues = res.issues;
      var nameScores = issues.map(issue => `${issue.fields.creator.displayName}: ${issue.fields.priority.id}`);
      resolve(nameScores);
    });
  })
}
