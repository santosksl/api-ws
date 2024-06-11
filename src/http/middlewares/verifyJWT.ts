import { FastifyReply, FastifyRequest } from 'fastify';

async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}

export { verifyJWT };
