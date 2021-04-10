// import axios from "axios";

export default {
    onSubmit(context, payload) {
        // axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/register`, {
        //     "email": 'test@test.com',
        //     "password": 'testpassword',
        //     "first_name": 'test',
        //     "last_name": 'test2',
        //     "employee_number": '2345',
        //     "department_name": 'Tooling Products'
        // }, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
        context.commit("onSubmit", payload);
    }
}