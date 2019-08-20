alter session set "_ORACLE_SCRIPT"=true; 

CREATE USER moh_workflow_schema IDENTIFIED BY password;
GRANT CONNECT TO moh_workflow_schema;
GRANT CONNECT, RESOURCE, DBA TO moh_workflow_schema;
GRANT UNLIMITED TABLESPACE TO moh_workflow_schema;
