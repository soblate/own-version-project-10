
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity,
)
from models import Teacher, TokenBlocklist
from schemas import TeacherSchema
from extensions import db

teachers_bp = Blueprint('teacher', __name__)

@teachers_bp.post("/register")
def create_teachers():
    data = request.get_json()

    teacher = Teacher.get_user_by_username(username=data.get("username"))

    if teacher is not None:
        return jsonify({"error": "Account already exists"}), 409

    new_teacher = Teacher(
        username=data.get("username"),
        email=data.get("email"),
        # password = data.get("password"),
        first_name = data.get("first_name"),
        last_name = data.get("last_name"),
        current_school=data.get('current_school'),
        education=data.get('education'),
        subjects_taught=data.get('subjects_taught'),
        current_state=data.get('current_state'),
        grades_taught=data.get('grades_taught'),
        years_of_experience=data.get('years_of_experience'),
        past_jobs=data.get('past_jobs'),
        accolades=data.get('accolades'),
        accommodations=data.get('accommodations'),
        avatar=data.get('avatar')
        )
    new_teacher.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))

    new_teacher.save()

    return jsonify({"message": "Teacher created"}), 201



@teachers_bp.route('', methods=['GET'])
@jwt_required()
def get_teacherss():
    teachers = Teacher.query.all()
    return jsonify({"teachers": TeacherSchema(many=True).dump(teachers)}), 200


@teachers_bp.post("/login")
def login_user():
    data = request.get_json()

    teacher = Teacher.get_user_by_username(username=data.get("username"))

    if teacher and (teacher.check_password(password=data.get("password"))):
        access_token = create_access_token(identity=teacher.username)
        refresh_token = create_refresh_token(identity=teacher.username)

        return (
            jsonify(
                {
                    "message": "Logged In ",
                    "tokens": {"access": access_token, "refresh": refresh_token},
                }
            ),
            200,
        )

    return jsonify({"error": "Invalid username or password"}), 400


@teachers_bp.get("/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})


@teachers_bp.get('/logout')
@jwt_required(verify_type=False) 
def logout_user():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type = jwt['type']

    token_b = TokenBlocklist(jti=jti)

    token_b.save()

    return jsonify({"message": f"{token_type} token revoked successfully"}) , 200


