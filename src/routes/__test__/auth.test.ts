import request from 'supertest';

import { app } from '../../app';


// ===================Signup======================================

describe('signup', () => {
    it('returns a 201 on successful signup', async () => {
        return request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya Ikemma',
                password: '12345!2Aa'
            }).expect(201);
    });


    it('returns 400 when the name or password is missing', async () => {

        await request(app)
            .post('/api/auth/signup')
            .send({
                password: '12345!2Aa'
            })
            .expect(400);

        await request(app)
            .post('/api/auth/signup')
            .send({

                name: 'Ifunanya'

            })
            .expect(400);

    })

    it('it disallows duplicate names', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya',
                password: '12345!2Aa'
            })
            .expect(201);

        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya',
                password: '12345!2Aa'
            })
            .expect(400);
    });

    it('sets a cookie after successful signup', async () => {

        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya Egbosi',
                password: '12345!2Aa'
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();

    });

});

// =================Signin================================================

describe('signin', () => {
    it('returns a 200 on a successful signin', async () => {

        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya Ikemma',
                password: '12345!2Aa'
            })
            .expect(201);

        const response = await request(app)
            .post('/api/auth/signin')
            .send({
                name: 'Ifunanya Ikemma',
                password: '12345!2Aa'
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });

    it('fails when an name that does not exist is supplied', async () => {
        await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'IK',
                password: '12345!2Aa'
            })
            .expect(400);
    });

    it('fails when an incorrect password is supplied', async () => {

        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya Ikemma',
                password: '12345!2Aa'
            })
            .expect(201);

        await request(app)
            .post('/api/auth/signin')
            .send({
                name: 'Ifunanya Ikemma',
                password: 'password4r'
            })
            .expect(400);

    })
})


// ===================current user=================================

describe('currentuser', () => {
    it('responds with details about the current user', async () => {

        const cookie = await global.signin();

        const response = await request(app)
            .post('/api/auth/currentuser')
            .set('Cookie', cookie)
            .send()
            .expect(200);
    });

    it('responds with null if not authencated', async () => {
        const response = await request(app)
            .post('/api/auth/currentuser')
            .send()
            .expect(200);
    });
})

// =====================signout=================================

describe('signout', () => {

    it('clears the cookie after signing out', async () => {
        await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Ifunanya Ikemma',
                password: '12345!2Aa'
            })
            .expect(201);

        const response = await request(app)
            .post('/api/auth/signout')
            .send({})
            .expect(200);

        // console.log(response.get('Set-Cookie'));
        expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
    });
})