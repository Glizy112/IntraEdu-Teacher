const BASE_URL = 'http://intraedu.in/admin/Teacher_Api/';
const IMG_URL = 'http://intraedu.in/admin/';
// const IMG_URL = 'http://b7b4-42-108-196-158.ngrok.io/SchoolManagement/';
// const BASE_URL = 'http://fe8d-45-250-44-193.ngrok.io/SchoolManagement/Teacher_Api/';
export default {
  login: `${BASE_URL}teacher_login_id`,
  studentList: `${BASE_URL}Find_Student_teacher_id`,
  update_student_details: `${BASE_URL}update_student_details`,
  get_all_class: `${BASE_URL}get_all_stream`,
  get_all_book: `${BASE_URL}all_book_stream_id`,
  list_member: `${BASE_URL}list_member`,
  addBookByTeacher: `${BASE_URL}addBookByTeacher`,
  library_assign_book: `${BASE_URL}library_assign_book`,
  library_student_list: `${BASE_URL}library_student_list`,
  update_book_status: `${BASE_URL}update_book_status`,
  get_subject_classID: `${BASE_URL}get_subject_classID`,
  get_section_classId: `${BASE_URL}get_section_classId`,
  Find_Student_By_class_section: `${BASE_URL}Find_Student_By_class_section`,
  student_attendance: `${BASE_URL}student_attendance`,
  list_school_gallery: `${BASE_URL}list_school_gallery`,
  add_school_gallery: `${BASE_URL}add_school_gallery`,
  profile_IMG: `${IMG_URL}assets/uploads/teacher-photo/`,
  gallery_IMG: `${IMG_URL}assets/uploads/gallery/`,
  notice_IMG: `${IMG_URL}assets/uploads/notice/`,
  event_IMG: `${IMG_URL}assets/uploads/event/`,
  material_IMG: `${IMG_URL}assets/uploads/material/`,
  student_IMG: `${IMG_URL}assets/uploads/student-photo/`,
  student_history: `${BASE_URL}student_history`,
  student_month_attendance: `${BASE_URL}student_month_attendance`,
  event_data: `${BASE_URL}teacher_event_add`,
  update_data: `${BASE_URL}updateEvent`,
  event_by_teacher: `${BASE_URL}event_by_teacher`,
  getParticipentByEventId: `${BASE_URL}getParticipentByEventId`,
  insert_ptm: `${BASE_URL}insert_ptm`,
  ptmByTeacherId: `${BASE_URL}ptmByTeacherId`,
  ptm_history: `${BASE_URL}ptm_history`,
  ptmuserlist: `${BASE_URL}getMeetingAttendHistoryBymeetingId`,
  list_leave: `${BASE_URL}leave_list_application_by_teacherId`,
  update_leave_status: `${BASE_URL}update_leave_status`,
  complain_by_teacher: `${BASE_URL}complain_by_teacher`,
  teacher_complain: `${BASE_URL}teacher_complain`,
  change_password: `${BASE_URL}change_password`,
  add_notice: `${BASE_URL}add_notice`,
  list_notice: `${BASE_URL}list_notice`,
  timetable: `${BASE_URL}timetable`,
  teacher_create_lecture: `${BASE_URL}teacher_create_lecture`,
  list_teacher_lecture: `${BASE_URL}list_teacher_lecture`,
  divert_lecture: `${BASE_URL}divert_lecture`,
  update_lecture_status: `${BASE_URL}update_lecture_status`,
  class_attendance: `${BASE_URL}routineClass`,
  attendance_subject: `${BASE_URL}routineSubject`,
  attendance_section: `${BASE_URL}routineSection`,
  list_employee: `${BASE_URL}list_employee`,
  list_all_teacher_by_school: `${BASE_URL}list_all_teacher_by_school`,
  addstudymaterial: `${BASE_URL}addMaterial`,
  listMaterialImage: `${BASE_URL}listMaterialImage`,
  listMaterialLink: `${BASE_URL}listMaterialLink`,
  listMaterial: `${BASE_URL}listMaterial`,
  listLinkType: `${BASE_URL}listLinkType`,
  updateSchoolGallery: `${BASE_URL}updateSchoolGallery`,
  addAssignment: `${BASE_URL}addAssignment`,
  getSubmitAssignmentDetailsById: `${BASE_URL}getSubmitAssignmentDetailsById`,
  updateStudentSubmissionStatusBySubmissionId: `${BASE_URL}updateStudentSubmissionStatusBySubmissionId`,
  assignmentlist: `${BASE_URL}listAssignmentByTeacherId`,
  updateAssignment: `${BASE_URL}updateAssignment`,
  getExamTerm: `${BASE_URL}getExamTerm`,
  getStudentResultByTermId: `${BASE_URL}getStudentResultByTermId`,
  addTeacherEducation: `${BASE_URL}addTeacherEducation`,
  addTeacherExperience: `${BASE_URL}addTeacherExperience`,
  addRewardAndCertificate: `${BASE_URL}addRewardAndCertificate`,
  listTeacherAboutUs: `${BASE_URL}listTeacherAboutUs`,
  editTeacherEducationById: `${BASE_URL}editTeacherEducationById`,
  editTeacherExperienceById: `${BASE_URL}editTeacherExperienceById`,
  updateTeacherRewardById: `${BASE_URL}updateTeacherRewardById`,
  editAbuotUsByTeacherId: `${BASE_URL}editAbuotUsByTeacherId`,
  teacher_create_mcq: `${BASE_URL}teacher_create_mcq`,
  getMcqCreateByTeacher: `${BASE_URL}getMcqCreateByTeacher`,
  getStudentDetailsByTestId: `${BASE_URL}getStudentDetailsByTestId`,
  getGivenMcqRecordBystudentId: `${BASE_URL}getGivenMcqRecordBystudentId`,
  testHistoryByTeacherId: `${BASE_URL}testHistoryByTeacherId`,
  getStudentMcqRecord: `${BASE_URL}getStudentMcqRecord`,
  createResubmissionExam: `${BASE_URL}createResubmissionExam`,
  download_sample_excel: `${BASE_URL}download_sample_excel`,
  addBulkBook: `${BASE_URL}addBulkBook`,
  provideCertificate: `${BASE_URL}provideCertificate`,
  
};
