# Sample exports

Two tiny anonymised exports, the shape the importer expects. The tests read them, so keep them
valid CSV.

## workday-absence-sample.csv

A Workday absence report. Columns: Worker (written "Surname, Forename"), Employee ID (the Core ID
or File ID), Time Off Type, Start Date, End Date, Total Days, Status and Comment. Dates are
dd/mm/yyyy here; the importer detects the format from the file. Only rows with a status of
Approved are applied unless the operator overrides it.

## jira-issues-sample.csv

A Jira Cloud CSV export. Columns: Issue key, Summary, Issue Type, Status, Assignee, Sprint,
Custom field (Story Points), Parent and Resolved. An assignee email or account id column is read
where the export carries one. Issue keys decide whether a row updates an existing work item or
proposes a new one.
