
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity,
)
from models import School, TokenBlocklist
from schemas import SchoolSchema
from extensions import db

schools_bp = Blueprint('school', __name__)

@schools_bp.post("/register")
def create_schools():
    data = request.get_json()

    school = School.get_user_by_username(username=data.get("username"))

    if school is not None:
        return jsonify({"error": "Account already exists"}), 409

    new_school = School(
        username=data.get("username"),
        email=data.get("email"),
        # password = data.get("password"),
        state = data.get("state"),
        city = data.get("city"),
        name = data.get("name"),
        )
    new_school.set_password(password=data.get("password"))
    
    # new_user.set_password(password=data.get("password"))

    new_school.save()

    return jsonify({"message": "School created"}), 201



@schools_bp.route('', methods=['GET'])
@jwt_required()
def get_schools():
    schools = School.query.all()
    return jsonify({"schools": SchoolSchema(many=True).dump(schools)}), 200


@schools_bp.post("/login")
def login_user():
    data = request.get_json()

    school = School.get_user_by_username(username=data.get("username"))

    if school and (school.check_password(password=data.get("password"))):
        access_token = create_access_token(identity=school.username)
        refresh_token = create_refresh_token(identity=school.username)

        return (
            jsonify(
                {
                    "message": "Logged In ",
                    "tokens": {"access": access_token, "refresh": refresh_token},
                    "id": school.id,
                }
            ),
            200,
        )

    return jsonify({"error": "Invalid username or password"}), 400


@schools_bp.get("/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})


@schools_bp.get('/logout')
@jwt_required(verify_type=False) 
def logout_user():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type = jwt['type']

    token_b = TokenBlocklist(jti=jti)

    token_b.save()

    return jsonify({"message": f"{token_type} token revoked successfully"}) , 200


@schools_bp.get("/profile/<username>")
def get_user_profile(username):
    user = School.get_user_by_username(username=username)
    return jsonify({"school": SchoolSchema().dump(user)})


