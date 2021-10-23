import request from 'supertest';

import { app } from '../../app';
import { Song, User } from '../../models/index'


describe('Add a list to a given user', () => {

    it('Validates for valid inputs', async () => {
        const user = global.signin();
        const listid = 'dd920e';
        await request(app)
            .post(`/api/users/${user.id}/lists`)
            .set('Cookie', user)
            .send({
                user: user.id,
                listId: listid,
                songs: [
                    {
                        title: 'Do-me',
                        artist: 'Psquare'
                    }
                ]
            })
            .expect(200)
    });


    it('returns 400 if its an invalid parameter', async () => {
        const user = global.signin();
        const listid = 'dd920e';
        await request(app)
            .post(`/api/users/${user.id}/lists`)
            .set('Cookie', user)
            .send({
                user: user.id,
                listId: listid,
                songs: [
                    {
                        title: 'Do-me',
                        name: 'Psqaure'
                    }
                ]
            })
            .expect(400)

    });

    it('returns 401 if user is not found with the given id (or user is not the one authenticated)', async () => {

        const user = global.signin();
        const userid = '61716247fbf885e83a8hbnjf121';
        const listid = 'dd920e';
        await request(app)
            .post(`/api/users/${userid}/lists`)
            .set('Cookie', user)
            .send({
                user: userid,
                listId: listid,
                songs: [
                    {
                        title: 'Do-me',
                        artist: 'Psqaure'
                    }
                ]
            })
            .expect(401)
        expect(user.id).toEqual(userid);

    })

});


describe('Gets the lists of a given user', () => {

    it('returns the list of a given user', async () => {
        const user = global.signin();
        await request(app)
            .get(`/api/users/${user.id}/lists`)
            .set('Cookie', user)
            .send()
            .expect(200)
    });


    it('returns 401 if user is not found with the given id (or user is not the one authenticated)', async () => {

        const user = global.signin();
        const userid = '61716247fbf885e83a8hbnjf121';
        await request(app)
            .get(`/api/users/${userid}/lists`)
            .set('Cookie', user)
            .send()
            .expect(401)

        expect(user.id).toEqual(userid);

    })

})


describe('Get a specific user list', () => {

    it('returns 200 for valid user id and list id', async () => {

        const user = global.signin();
        const listid = 'dd920e';
        await request(app)
            .post(`/api/users/${user.id}/lists`)
            .set('Cookie', user)
            .send({
                user: user.id,
                listId: listid,
                songs: [
                    {
                        title: 'Do-me',
                        artist: 'Psquare'
                    }
                ]
            })
            .expect(200)

        await request(app)
            .get(`/api/users/${user.id}/lists/${listid}`)
            .set('Cookie', user)
            .send()
            .expect(200)

    });


    it('returns 401 if user is not found with the given id (or user is not the one authenticated)', async () => {

        const user = global.signin();
        const userid = '61716247fbf885e83a8hbnjf121';
        const listid = 'ahb908'
        await request(app)
            .get(`/api/users/${userid}/lists/${listid}`)
            .set('Cookie', user)
            .send()
            .expect(401)

        expect(user.id).toEqual(userid);

    })

})