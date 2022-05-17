// const functs = require("../api/twilio_funcs/twilio-functs");
const supertest = require("supertest");
const app = require("../index");

describe("sms", () => {
    describe("get sms route", () => {
        it("should return 200", async () => {
            await supertest(app).get("/sms").expect(200);
        });
    });

    describe("post sms route", () => {
        // it("should return 200", async () => {
        //     await supertest(app)
        //         .post("/sms")
        //         .send("to=+41767239217&message=Testing with supertest")
        //         .expect(200);
        // });

        it("should return 400", async () => {
            await supertest(app)
                .post("/sms")
                .send("message=Testing with supertest")
                .expect(400);
        });
    });
});

describe("whatsapp", () => {
    describe("get whatsapps route", () => {
        it("should return 200", async () => {
            await supertest(app).get("/whatsapps").expect(200);
        });
    });

    describe("post whatsapps route", () => {
        // it("should return 200", async () => {
        //     await supertest(app)
        //         .post("/whatsapp")
        //         .send("to=+41767239217&message=Testing with supertest")
        //         .expect(200);
        // });

        it("should return 400", async () => {
            await supertest(app)
                .post("/whatsapps")
                .send("message=Testing with supertest")
                .expect(400);
        });
    });
});
