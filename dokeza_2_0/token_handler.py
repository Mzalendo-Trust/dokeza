from corsheaders.signals import check_request_enabled


def jwt_response_payload_handler(token, user, request):
    user = request.user
    return {
        'token': token,
        'user': str(user.username),
        'active': user.is_active,
    }


def cors_allow_api_to_everyone(sender, request, **kwargs):
    return request.path.startswith('/api/')


check_request_enabled.connect(cors_allow_api_to_everyone)
