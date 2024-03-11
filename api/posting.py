
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity,
)
from models import Posting, TokenBlocklist
from schemas import PostingSchema
from extensions import db

postings_bp = Blueprint('postings', __name__)

@postings_bp.post("/")
def create_postings():
    data = request.get_json()

    # teacher = Posting.get_by_id(id=data.get("username"))

    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409

    new_posting = Posting(
        title = data.get("title"),
        experience = data.get("experience"),
        school_id = data.get("school_id"),
        city = data.get("city"),
        state = data.get("state"),
        salary_est = data.get("salary_est"),
        start_date = data.get("start_date")
        )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))

    new_posting.save()

    return jsonify({"message": "Posting created"}), 201


@postings_bp.put("/postings/<id>")
def update_postings(id):
    data = request.get_json()

    posting = Posting.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if posting is not None:
        posting.title=data.get("title")
        posting.experience=data.get("experience")
        posting.school_id=data.get("school_id")
        posting.city = data.get("city")
        posting.state = data.get("state")
        posting.salary_est = data.get("salary_est")
        posting.start_date = data.get("start_date")

        posting.save_existing()
        return jsonify(PostingSchema().dump(posting)), 201

    # new_answer = Posting(
    #         application_id = data.get("application_id"),
    #         teacher_id = data.get("teacher_id"),
    #         answer_field = data.get("answer_field")
    #     )
    # new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))
    return jsonify({"message": "Unable to update posting"}), 400

@postings_bp.delete("/postings/<id>")
def delete_postings(id):
    # data = request.get_json()
    posting = Posting.get_by_id(id=id)
    # answer.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if posting is not None:
        posting.delete()

    return jsonify({"message": "Posting Deleted"}), 201


@postings_bp.get("/schools/<id>")
def get_postings_by_school_id(id):

    postings = Posting.get_by_school_id(school_id=id)
    result = PostingSchema().dump(postings, many=True)

    print(postings)
    return (
            jsonify(
                {
                    "postings": result
                }
            ),
            200,
        )

    # return jsonify({"message": "Posting Deleted"}), 201

@postings_bp.get("/posting/<id>")
def get_postings_by_id(id):
    posting = Posting.get_by_id(id=id)
    result = PostingSchema().dump(posting)

    # posting.get_by_id()
    # if teacher is not None:
        # return jsonify({"error": "Account already exists"}), 409
    if posting is not None:
        return (
            jsonify(result)
        )
    
    return jsonify({"message": "Posting not found"}), 400


@postings_bp.get("/allpostings")
def get_postings():
    postings = Posting.query.all()
    result = PostingSchema().dump(postings, many=True)
    print(postings)
    return (
            jsonify(
                {
                    "postings": result
                }
            ),
            200,
        )





