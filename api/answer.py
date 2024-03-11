
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity,
)
from models import Answer, TokenBlocklist
from schemas import AnswerSchema
from extensions import db

answers_bp = Blueprint('answer', __name__)

@answers_bp.post("/")
def create_answers():
    data = request.get_json()

    # teacher = Answer.get_by_id(id=data.get("username"))

    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409

    new_answer = Answer(
            application_id = data.get("application_id"),
            teacher_id = data.get("teacher_id"),
            answer_field = data.get("answer_field")
        )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))

    new_answer.save()

    return jsonify({"message": "Answer created"}), 201


@answers_bp.put("/answer/<id>")
def update_answers(id):
    data = request.get_json()

    answer = Answer.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if answer is not None:
        answer.application_id=data.get("application_id")
        answer.teacher_id=data.get("teacher_id")
        answer.answer_field=data.get("answer_field")
        answer.save_existing()
        return jsonify({"message": "Answer Updated"}), 201

    # new_answer = Answer(
    #         application_id = data.get("application_id"),
    #         teacher_id = data.get("teacher_id"),
    #         answer_field = data.get("answer_field")
    #     )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))
    return jsonify({"message": "Unable to update answer"}), 400

@answers_bp.delete("/answer/<id>")
def delete_answers(id):
    data = request.get_json()

    answer = Answer.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if answer is not None:
        answer.delete()

    return jsonify({"message": "Answer Deleted"}), 201


@answers_bp.get("/application/<id>")
def get_answers_by_application(id):
    data = request.get_json()

    answers = Answer.get_by_application_id(application_id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    # if answer is not None:
    #     answer.delete()
    result = AnswerSchema().dump(answers, many=True)
    # UserSchema().dump(users, many=True)
    return (
            jsonify(
                {
                    "answers": result
                }
            ),
            200,
        )

    # return jsonify({"message": "Answer Deleted"}), 201

@answers_bp.get("/answer/<id>")
def get_answers_by_id(id):
    data = request.get_json()

    answer = Answer.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    result = AnswerSchema().dump(answer)

    if answer is not None:
        return (
            jsonify(answer)
        )
    
    return jsonify({"message": "Answer not found"}), 400




