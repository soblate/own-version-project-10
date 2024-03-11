from marshmallow import fields, Schema


class UserSchema(Schema):
    id = fields.String()
    username = fields.String()
    email = fields.String()


class TeacherSchema(Schema):
    id = fields.String()
    username = fields.String()
    email = fields.String()
    first_name = fields.String()
    last_name = fields.String()
    current_school = fields.String()
    education = fields.String()
    subjects_taught = fields.String()
    current_state = fields.String()
    grades_taught = fields.String()
    years_of_experience = fields.String()
    past_jobs = fields.String()
    accolades = fields.String()
    accommodations = fields.String()
    avatar = fields.String()


class ApplicationSchema(Schema):
    id = fields.String()
    teacher_id = fields.String()
    posting_id = fields.String()
    question_id = fields.List(fields.String())
    answer_id = fields.List(fields.String())


class AnswerSchema(Schema):
    id = fields.String()
    application_id = fields.String()
    teacher_id = fields.String()
    answer_field = fields.String()

class SchoolSchema(Schema):
    id = fields.String()
    name = fields.String()
    city = fields.String()
    state = fields.String()
    email = fields.String()


class PostingSchema(Schema):
    id = fields.String()
    title = fields.String()
    experience = fields.String()
    salary_est = fields.String()
    start_date = fields.String()
    state = fields.String()
    city = fields.String()
    school_id = fields.String()


class QuestionSchema(Schema):
    id = fields.String()
    title = fields.String()
    content = fields.String()
    type = fields.String()
    posting_id = fields.String()