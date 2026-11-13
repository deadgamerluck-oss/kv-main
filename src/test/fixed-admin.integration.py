"""Run with Cloud server credentials and KV_ADMIN_TEST_PASSWORD in the environment."""
import os
import requests

url = os.environ['SUPABASE_URL'].rstrip('/')
key = os.environ['SUPABASE_SERVICE_ROLE_KEY']
headers = {'apikey': key, 'Authorization': 'Bearer ' + key}

def test_only_fixed_owner_has_admin_access():
    response = requests.get(url + '/rest/v1/user_roles?select=user_id&role=eq.admin', headers=headers, timeout=30)
    response.raise_for_status()
    assert response.json() == [{'user_id': '76e28d77-0bfa-451f-85e6-12793ff6f7cc'}]
    owner = requests.get(url + '/auth/v1/admin/users/76e28d77-0bfa-451f-85e6-12793ff6f7cc', headers=headers, timeout=30)
    owner.raise_for_status()
    assert owner.json()['email'] == 'admina@kv.com'
    assert owner.json()['email_confirmed_at'] is not None

def test_precreated_login_needs_no_registration():
    response = requests.post(url + '/auth/v1/token?grant_type=password', headers=headers, json={
        'email': 'admina@kv.com', 'password': os.environ['KV_ADMIN_TEST_PASSWORD']
    }, timeout=30)
    response.raise_for_status()
    assert response.json()['user']['id'] == '76e28d77-0bfa-451f-85e6-12793ff6f7cc'
    assert response.json()['user']['email'] == 'admina@kv.com'

if __name__ == '__main__':
    test_only_fixed_owner_has_admin_access()
    test_precreated_login_needs_no_registration()
    print('2 fixed admin access tests passed.')