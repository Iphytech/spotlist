import request from 'supertest';
import { app } from '../../app';


it('returns 401 if user is not found with the given id (or user is not the one authenticated)', async () => {

    const userid = '61716247fbf885e83a8hbnjf121';
    const listid = 'dd920e';
    await request(app)
        .post(`/api/users/${userid}/lists`)
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

})




it('returns 401 if user is not found with the given id (or user is not the one authenticated)', async () => {

    const userid = '61716247fbf885e83a8hbnjf121';
    await request(app)
        .get(`/api/users/${userid}/lists`)
        .send()
        .expect(401)

})
