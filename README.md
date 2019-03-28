# wugz-FMS
记录归档服务修改的地方。
/Fe-Pt5.5DOV/WebRoot/js35/transact.js  isCanGD()

fe中在fe_app5增加fms_task,fms_data表，wf_task 增加个字段fileflag。
新增表，fe_app5中增加一个日志表
create table FMS_LOG
(
  ID          VARCHAR2(64) not null
    constraint PK_FMS_LOG
    primary key,
  TASKID      VARCHAR2(64),
  DESCRIPTION VARCHAR2(256),
  CLASSNAME   VARCHAR2(256),
  METHODNAME  VARCHAR2(256),
  STARTTIME   VARCHAR2(64),
  ENDTIME     VARCHAR2(64),
  EXECTIME    VARCHAR2(64),
  EXCEPTION   VARCHAR2(512)
)

