
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity,
)
from models import Application, TokenBlocklist
from schemas import ApplicationSchema
from extensions import db

applications_bp = Blueprint('applications', __name__)

@applications_bp.post("/")
def create_applications():
    data = request.get_json()

    # teacher = Answer.get_by_id(id=data.get("username"))

    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409

    new_application = Application(
           teacher_id = data.get("teacher_id"),
           posting_id = data.get("posting_id"),
           question_id = data.get("question_id"),
           answer_id = data.get("answer_id")
        )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))

    new_application.save()

    return jsonify({"message": "Application created"}), 201


@applications_bp.put("/application/<id>")
def update_applications(id):
    data = request.get_json()

    application = application.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if application is not None:
        application.application_id=data.get("application_id")
        application.teacher_id=data.get("teacher_id")
        application,answer_field=data.get("answer_field")
        application.save_existing()
        return jsonify({"message": "Application Updated"}), 201

    # new_answer = Answer(
    #         application_id = data.get("application_id"),
    #         teacher_id = data.get("teacher_id"),
    #         answer_field = data.get("answer_field")
    #     )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))
    return jsonify({"message": "Unable to update application"}), 400

@applications_bp.delete("/application/<id>")
def delete_applications():
    data = request.get_json()

    application = Application.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if application is not None:
        application.delete()

    return jsonify({"message": "Application Deleted"}), 201


@applications_bp.get("/teacher/<id>")
def get_applications_by_teacher(id):
    data = request.get_json()

    applications = Application.get_by_teacher(teacher_id=id)
    result = ApplicationSchema().dump(applications, many=True)

    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    # if answer is not None:
    #     answer.delete()
    return (
            jsonify(
                {
                    "applications": result
                }
            ),
            200,
        )

    # return jsonify({"message": "Answer Deleted"}), 201

@applications_bp.get("/application/<id>")
def get_applications_by_id(id):
    data = request.get_json()

    application= Application.get_by_id(id=id)
    result = ApplicationSchema().dump(application, many=True)

    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if application is not None:
        return (
            jsonify(result)
        )
    
    return jsonify({"message": "Application not found"}), 400




