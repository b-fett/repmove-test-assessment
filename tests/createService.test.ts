import request from "supertest";
import app from "../src/app";

describe("API Tests", () => {
  describe("POST /api/accounts", () => {
    it("updatedAt won’t be saved accidentally", async () => {
      const res = await request(app)
        .post("/api/accounts")
        .send({
          name: "some_name",
          scope: "account",
          updatedAt: new Date("2012-12-12"),
        });

      expect(res.body.error).toBeFalsy();
      expect(new Date(res.body.updatedAt)).toBeValidDate();
      expect(new Date(res.body.updatedAt).getFullYear()).not.toBe(2012);
      expect(res.statusCode).toBe(200);
    });

    it("createdAt won’t be saved accidentally", async () => {
      const res = await request(app)
        .post("/api/accounts")
        .send({
          name: "some_name",
          scope: "account",
          createdAt: new Date("2012-12-12"),
        });

      expect(res.body.error).toBeFalsy();
      expect(new Date(res.body.updatedAt)).toBeValidDate();
      expect(new Date(res.body.updatedAt).getFullYear()).not.toBe(2012);
      expect(res.statusCode).toBe(200);
    });

    it("validation is not passed - return list of zod errors", async () => {
      const res = await request(app).post("/api/accounts").send({
        scope: "account",
      });

      expect(res.body.error).toBeTruthy();
      expect(res.body.error).toMatchSnapshot();
      expect(res.statusCode).toBe(500);
    });

    it("validation is successful - return created or updated model", async () => {
      const res1 = await request(app)
        .post("/api/accounts")
        .send({ name: "some_name", scope: "account" });

      expect(res1.body.error).toBeFalsy();
      expect(res1.body._id).toBeString();
      expect(res1.body.name).toBe("some_name");
      expect(res1.body.scope).toBe("account");
      expect(new Date(res1.body.createdAt)).toBeValidDate();
      expect(new Date(res1.body.updatedAt)).toBeValidDate();
      expect(res1.statusCode).toBe(200);

      const res2 = await request(app).patch("/api/accounts").send({
        _id: res1.body._id,
        name: "some_another_name",
        scope: "child",
      });

      expect(res2.body.error).toBeFalsy();
      expect(res2.body._id).toBe(res1.body._id);
      expect(res2.body.name).toBe("some_another_name");
      expect(res2.body.scope).toBe("child");
      expect(new Date(res2.body.createdAt)).toBeValidDate();
      expect(new Date(res2.body.updatedAt)).toBeValidDate();
      expect(res2.statusCode).toBe(200);
    });
    it("scope is not equal account, prospect, child - zod must validate it as well", async () => {
      const res = await request(app).post("/api/accounts").send({
        name: "some_name",
        scope: "wrong_scope",
      });
      expect(res.body.error).toMatchSnapshot();
      expect(res.statusCode).toBe(500);
    });
  });

  describe("GET /api/accounts/stats", () => {
    it("Return count of each account scope in next structure { accounts: number,  prospects: number, children: number }", async () => {
      const res = await request(app).get("/api/accounts/stats");

      expect(res.body.error).toBeFalsy();
      expect(res.body.accounts).toBeGreaterThan(0);
      expect(res.body.prospects).toBe(0);
      expect(res.body.children).toBeGreaterThan(0);
      expect(res.statusCode).toBe(200);
    });
  });
});
