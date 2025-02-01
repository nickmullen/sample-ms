import request from "supertest";
import express from "express";
import bookController from "../../src/controllers/book";
import BookService from "../../src/services/book";
import LOG from "../../src/utils/log";
import { NotFoundError } from "../../src/middleware/error";

jest.mock("../../src/services/book");
jest.mock("../../src/utils/log");

const app = express();
app.use(express.json());
app.post("/books", bookController.createBook);
app.delete("/books/:id", bookController.deleteBook);
app.get("/books", bookController.getBooks);
app.get("/books/:id", bookController.readBook);

describe("BookController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createBook - should create a book and return 201", async () => {
    const mockBook = { id: "1", author: "Test Author", names: ["Test"], descriptions: ["Test Description"] };
    (BookService.createBook as jest.Mock).mockResolvedValue(mockBook);

    const response = await request(app)
      .post("/books")
      .send({ author: "Test Author", names: ["Test"], descriptions: ["Test Description"] });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Book created successfully",
      book: mockBook
    });
  });

  test("createBook - should return 500 on error", async () => {
    (BookService.createBook as jest.Mock).mockRejectedValue(new Error("Failed to create book"));

    const response = await request(app)
      .post("/books")
      .send({ author: "Test Author", names: ["Test"], descriptions: ["Test Description"] });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to create book" });
  });

  test("deleteBook - should return 204 on successful deletion", async () => {
    (BookService.deleteBook as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/books/1");

    expect(response.status).toBe(204);
  });

  test("getBooks - should return books and status 200", async () => {
    const mockBooks = [{ id: "1", author: "Test Author" }];
    (BookService.getBooks as jest.Mock).mockResolvedValue(mockBooks);

    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Found books",
      books: mockBooks
    });
  });

  test("getBooks - should return 500 on error", async () => {
    (BookService.getBooks as jest.Mock).mockRejectedValue(new Error("Failed to read book"));

    const response = await request(app).get("/books");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to read book" });
  });

  test("readBook - should return book and status 200", async () => {
    const mockBook = { id: "1", author: "Test Author" };
    (BookService.readBook as jest.Mock).mockResolvedValue(mockBook);

    const response = await request(app).get("/books/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Found book",
      book: mockBook
    });
  });

  test("readBook - should return 404 when book is not found", async () => {
    (BookService.readBook as jest.Mock).mockRejectedValue(new NotFoundError());

    const response = await request(app).get("/books/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Not found: 1" });
  });

  test("readBook - should return 500 on unexpected error", async () => {
    (BookService.readBook as jest.Mock).mockRejectedValue(new Error("Failed to read book"));

    const response = await request(app).get("/books/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to read book" });
  });
});
