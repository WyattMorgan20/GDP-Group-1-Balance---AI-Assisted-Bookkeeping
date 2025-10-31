drop table if exists Business;
drop table if exists Role;
drop table if exists Permission;
drop table if exists User;
drop table if exists UserRole;
drop table if exists RolePermission;
drop table if exists Document;
drop table if exists DocumentUpload;
drop table if exists UploadParse;
drop table if exists SystemWork;
drop table if exists ParseReview;
drop table if exists CloseChecklist;
drop table if exists CloseProcess;
drop table if exists CloseTask;
drop table if exists CloseTaskComment;
drop table if exists CloseTaskAttachment;
drop table if exists CloseReview;
drop table if exists CloseProcessAnalytic;
drop table if exists CloseIssueLogEntry;
drop table if exists CloseAuditLogEntry;

create table Business (
  business_id RAW(16),
  name VARCHAR2(255),
  description VARCHAR2(255) NULL,
  type VARCHAR2(50),
  country VARCHAR2(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP NULL,
  constraint pk_Business primary key(business_id)
);

create table User (
  user_id RAW(16),
  business_id RAW(16),
  name VARCHAR2(255),
  email VARCHAR2(255),
  status VARCHAR2(50) NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP NULL,
  constraint pk_User primary key(user_id),
  constraint fk_User_business_id foreign key(business_id) references Business(business_id)
);

create table Role (
  role_id RAW(16),
  name VARCHAR2(255),
  description VARCHAR2(255) NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP NULL,
  constraint pk_Role primary key(role_id)
);

create table Permission (
  permission_id RAW(16),
  name VARCHAR2(255),
  description VARCHAR2(255) NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP NULL,
  constraint pk_Permission primary key(permission_id)
);

create table UserRole (
  user_id RAW(16),
  role_id RAW(16),
  constraint fk_UserRole_user_id foreign key(user_id) references User(user_id),
  constraint fk_UserRole_role_id foreign key(role_id) references Role(role_id)
);

create table RolePermission (
  role_id RAW(16),
  permission_id RAW(16),
  constraint fk_RolePermission_role_id foreign key(role_id) references Role(role_id),
  constraint fk_RolePermission_permission_id foreign key(permission_id) references Permission(permission_id)
);

create table Document (
  document_id RAW(16),
  business_id RAW(16),
  name VARCHAR2(255),
  type VARCHAR2(50) NULL,
  path VARCHAR2(255) NULL,
  created_by TIMESTAMP NULL,
  created_at TIMESTAMP NULL,
  constraint pk_Document primary key(document_id)
);

create table DocumentUpload (
  upload_id RAW(16),
  document_id RAW(16),
  uploaded_by RAW(16),
  uploaded_at TIMESTAMP,
  constraint pk_DocumentUpload primary key(upload_id),
  constraint fk_DocumentUpload_document_id foreign key(document_id) references Document(document_id),
  constraint fk_DocumentUpload_uploaded_by foreign key(uploaded_by) references User(user_id)
);

create table UploadParse (
  parse_id RAW(16),
  upload_id RAW(16),
  status VARCHAR2(50),
  parsed_at TIMESTAMP,
  constraint pk_UploadParse primary key(parse_id),
  constraint fk_UploadParse_upload_id foreign key(upload_id) references DocumentUpload(upload_id)
);

create table SystemWork (
  work_id RAW(16),
  parse_id RAW(16),
  review_return_id RAW(16) NULL,
  status VARCHAR2(50),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  constraint pk_SystemWork primary key(work_id),
  constraint fk_SystemWork_parse_id foreign key(parse_id) references UploadParse(parse_id),
  constraint fk_SystemWork_review_return_id foreign key(review_return_id) references ParseReview(review_id) NULL
);

create table ParseReview (
  review_id RAW(16),
  work_id RAW(16),
  reviewd_by RAW(16),
  status VARCHAR2(50),
  description VARCHAR2(255),
  reviewed_at TIMESTAMP,
  constraint pk_ParseReview primary key(review_id),
  constraint fk_ParseReview_work_id foreign key(work_id) references SystemWork(work_id)
  constraint fk_ParseReview_reviewed_by foreign key(reviewed_by) references User(user_id)
);

create table CloseChecklist (
  checklist_id RAW(16),
  name VARCHAR2(255),
  description VARCHAR2(255),
  created_by RAW(16) NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  constraint pk_CloseChecklist primary key(checklist_id)
);

create table CloseProcess (
  process_id RAW(16),
  checklist_id RAW(16),
  name VARCHAR2(255),
  period_start TIMESTAMP,
  period_end TIMESTAMP,
  close_start_date TIMESTAMP,
  close_due_date TIMESTAMP,
  status VARCHAR2(50),
  created_by RAW(16),
  created_at TIMESTAMP,
  updated_at TIMESTAMP NULL,
  constraint pk_CloseProcess primary key(process_id),
  constraint fk_CloseProcess_checklist_id foreign key(checklist_id) references CloseChecklist(checklist_id),
  constraint fk_CloseProcess_created_by foreign key(created_by) references User(user_id)
);

create table CloseTask (
  task_id RAW(16),
  process_id RAW(16),
  name VARCHAR2(255),
  task_type VARCHAR2(50) NULL,
  description VARCHAR2(255),
  assigned_to RAW(16) NULL,
  status VARCHAR2(50),
  start_date TIMESTAMP,
  due_date TIMESTAMP,
  created_by RAW(16),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  completed_at TIMESTAMP,
  constraint pk_CloseTask primary key(task_id),
  constraint fk_CloseTask_process_id foreign key(process_id) references CloseProcess(process_id)
);

create table CloseTaskComment (
  comment_id RAW(16),
  task_id RAW(16),
  description VARCHAR2(255),
  created_by RAW(16),
  created_at TIMESTAMP,
  constraint pk_CloseTaskComment primary key(comment_id),
  constraint fk_CloseTaskComment_task_id foreign key(task_id) references CloseTask(task_id)
);

create table CloseTaskAttachment (
  attachment_id RAW(16),
  task_id RAW(16),
  review_id RAW(16),
  name VARCHAR2(255),
  uploaded_by RAW(16),
  uploaded_at TIMESTAMP,
  constraint pk_CloseTaskAttachment primary key(attachment_id),
  constraint fk_CloseTaskAttachment_task_id foreign key(task_id) references CloseTask(task_id),
  constraint fk_CloseTaskAttachment_review_id foreign key(review_id) references ParseReview(review_id)
);

create table CloseReview (
  review_id RAW(16),
  process_id RAW(16),
  task_id RAW(16),
  review_type VARCHAR2(50),
  status VARCHAR2(50),
  status_reason VARCHAR2(255) NULL,
  reviewed_by RAW(16),
  reviewed_at TIMESTAMP,
  constraint pk_CloseReview primary key(review_id),
  constraint fk_CloseReview_process_id foreign key(process_id) references CloseProcess(process_id),
  constraint fk_CloseReview_task_id foreign key(task_id) references CloseTask(task_id)
);

create table CloseProcessAnalytic (
  analytic_id RAW(16),
  process_id RAW(16),
  name VARCHAR2(255),
  value DECIMAL(14,2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  constraint pk_CloseProcessAnalytic primary key(analytic_id),
  constraint fk_CloseProcessAnalytic_process_id foreign key(process_id) references CloseProcess(process_id)
);

create table CloseIssueLogEntry (
  issue_id RAW(16),
  process_id RAW(16),
  name VARCHAR2(255),
  description VARCHAR2(255),
  status VARCHAR2(50),
  severity VARCHAR2(50),
  created_by RAW(16),
  created_at TIMESTAMP,
  resolved_at TIMESTAMP,
  constraint pk_CloseIssueLogEntry primary key(issue_id),
  constraint fk_CloseIssueLogEntry_process_id foreign key(process_id) references CloseProcess(process_id)
);

create table CloseAuditLogEntry (
  audit_id RAW(16),
  process_id RAW(16),
  entity_type VARCHAR2(50),
  entity_id RAW(16),
  description VARCHAR2(255),
  created_at TIMESTAMP,
  constraint pk_CloseAuditLogEntry primary key(audit_id),
  constraint fk_CloseAuditLogEntry_process_id foreign key(process_id) references CloseProcess(process_id)
);

INSERT INTO Business
  VALUES('6621eb26', 'Taylor Bookkeeping & Consulting', NULL, 'Sole-Proprietor', 'USA', '2025-10-31 14:51:43.678000', '2025-10-31 14:51:43.678000');

INSERT INTO User
  VALUES('60e8218e', '6621eb26', 'Jamie Taylor', 'jamie@taylorbooks.com', NULL, '2025-10-31 14:51:43.678000', '2025-10-31 14:51:43.678000');

INSERT INTO Role
  VALUES('29895ca6', 'Owner', NULL, '2025-10-31 14:51:43.678000', NULL);

INSERT INTO Permission
  VALUES('901bac84', 'Full Access', NULL, '2025-10-31 14:51:43.678000', NULL);

INSERT INTO UserRole
  VALUES('60e8218e', '29895ca6');

INSERT INTO RolePermission
  VALUES('29895ca6', '901bac84');

INSERT INTO Document
  VALUES('57ddaf7d', '6621eb26', 'Bank Reconciliation', NULL, NULL, NULL, NULL);
INSERT INTO Document
  VALUES('fd5266b6', '6621eb26', 'Financial Report', NULL, NULL, NULL, NULL);
INSERT INTO Document
  VALUES('8e9043ab', '6621eb26', 'Expense Summary', NULL, NULL, NULL, NULL);

INSERT INTO DocumentUpload
  VALUES('4d9285d0', '57ddaf7d', '60e8218e', '2025-10-28 14:51:43.678000');
INSERT INTO DocumentUpload
  VALUES('5026c7fc', 'fd5266b6', '60e8218e', '2025-10-28 14:51:43.678000');
INSERT INTO DocumentUpload
  VALUES('7a05028d', '8e9043ab', '60e8218e', '2025-10-28 14:51:43.678000');

INSERT INTO UploadParse
  VALUES('a82fc203', '4d9285d0', 'parsed', '2025-10-28 15:21:43.678000');
INSERT INTO UploadParse
  VALUES('b714ec3d', '5026c7fc', 'parsed', '2025-10-28 15:21:43.678000');
INSERT INTO UploadParse
  VALUES('ff97dbbf', '7a05028d', 'parsed', '2025-10-28 15:21:43.678000');

INSERT INTO SystemWork
  VALUES('26405c5d', 'a82fc203', NULL, 'completed', '2025-10-28 15:11:43.678000', '2025-10-28 15:21:43.678000');
INSERT INTO SystemWork
  VALUES('6182b137', 'b714ec3d', NULL, 'completed', '2025-10-28 15:11:43.678000', '2025-10-28 15:21:43.678000');
INSERT INTO SystemWork
  VALUES('1ad3c878', 'ff97dbbf', NULL, 'completed', '2025-10-28 15:11:43.678000', '2025-10-28 15:21:43.678000');

INSERT INTO ParseReview
  VALUES('5ac2b274', 'a82fc203', '60e8218e', 'approved', 'AI parsing looks accurate.', '2025-10-31 14:51:43.678000');
INSERT INTO ParseReview
  VALUES('b20bee74', 'b714ec3d', '60e8218e', 'approved', 'AI parsing looks accurate.', '2025-10-31 14:51:43.678000');
INSERT INTO ParseReview
  VALUES('b67a5e7f', 'ff97dbbf', '60e8218e', 'approved', 'AI parsing looks accurate.', '2025-10-31 14:51:43.678000');

INSERT INTO CloseChecklist
  VALUES('80539bac', 'October 2025 Month-End Close', 'Standard checklist for sole-proprietor close cycle', NULL, '2025-10-01 14:51:43.678000', '2025-10-06 14:51:43.678000');

INSERT INTO CloseProcess
  VALUES('c555b369', '80539bac', 'October 2025 Close', '2025-10-01 00:00:00', '2025-10-31 00:00:00', '2025-10-29 00:00:00', '2025-11-02 00:00:00', 'completed', '60e8218e', '2025-10-28 14:51:43.678000', '2025-10-31 14:51:43.678000');

INSERT INTO CloseTask
  VALUES('ec9a6fba', 'c555b369', 'Bank Reconciliation', NULL, 'Reconcile bank account transactions', NULL, 'completed',
         '2025-10-29 00:00:00', '2025-11-02 00:00:00', '60e8218e', '2025-10-31 00:00:00', '2025-10-28 14:51:43.678000', '2025-10-31 14:51:43.678000');
INSERT INTO CloseTask
  VALUES('08390093', 'c555b369', 'Review Expense Report', NULL, 'Verify all business expenses for the month', NULL, 'completed',
         '2025-10-29 00:00:00', '2025-11-02 00:00:00', '60e8218e', '2025-10-31 00:00:00', '2025-10-28 14:51:43.678000', '2025-10-31 14:51:43.678000');
INSERT INTO CloseTask
  VALUES('e8f99878', 'c555b369', 'Generate Financial Summary', NULL, 'Prepare income and expense summary for the owner', NULL, 'completed',
         '2025-10-29 00:00:00', '2025-11-02 00:00:00', '60e8218e', '2025-10-31 00:00:00', '2025-10-28 14:51:43.678000', '2025-10-31 14:51:43.678000');

INSERT INTO CloseTaskComment
  VALUES('bc73b900', 'ec9a6fba', 'Completed bank reconciliation successfully', '60e8218e', '2025-10-30 14:51:43.678000');
INSERT INTO CloseTaskComment
  VALUES('3fab678d', '08390093', 'Completed review expense report successfully', '60e8218e', '2025-10-30 14:51:43.678000');
INSERT INTO CloseTaskComment
  VALUES('3fd7371e', 'e8f99878', 'Completed generate financial summary successfully', '60e8218e', '2025-10-30 14:51:43.678000');

INSERT INTO CloseTaskAttachment
  VALUES('faae568c', 'ec9a6fba', '5ac2b274', 'Bank Reconciliation', '60e8218e', '2025-10-30 14:51:43.678000');
INSERT INTO CloseTaskAttachment
  VALUES('1f670dbe', '08390093', 'b20bee74', 'Financial Report', '60e8218e', '2025-10-30 14:51:43.678000');
INSERT INTO CloseTaskAttachment
  VALUES('481d5af5', 'e8f99878', 'b67a5e7f', 'Expense Summary', '60e8218e', '2025-10-30 14:51:43.678000');

INSERT INTO CloseReview
  VALUES('49b3e37d', 'c555b369', 'ec9a6fba', 'final', 'approved', NULL, '60e8218e', '2025-10-31 14:51:43.678000');
INSERT INTO CloseReview
  VALUES('2d871f4d', 'c555b369', '08390093', 'final', 'approved', NULL, '60e8218e', '2025-10-31 14:51:43.678000');
INSERT INTO CloseReview
  VALUES('cee65eda', 'c555b369', 'e8f99878', 'final', 'approved', NULL, '60e8218e', '2025-10-31 14:51:43.678000');

INSERT INTO CloseProcessAnalytic
  VALUES('27e49688', 'c555b369', 'Expense Accuracy %', 99.5, '2025-10-30 14:51:43.678000', '2025-10-31 14:51:43.678000');
INSERT INTO CloseProcessAnalytic
  VALUES('c4c174cd', 'c555b369', 'Transactions Reviewed', 123.0, '2025-10-30 14:51:43.678000', '2025-10-31 14:51:43.678000');

INSERT INTO CloseIssueLogEntry
  VALUES('9f8efd07', 'c555b369', 'Missing Expense Receipt', 'One lunch expense was missing a receipt', 'resolved', 'low', '60e8218e',
         '2025-10-29 14:51:43.678000', '2025-10-30 14:51:43.678000');

INSERT INTO CloseAuditLogEntry
  VALUES('fa104e16', 'c555b369', 'Close Task', 'ec9a6fba', 'Task marked as completed', '2025-10-30 14:51:43.678000');

commit;