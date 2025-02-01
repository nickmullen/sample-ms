import BookService from "../../src/services/book";
import { NotFoundError } from "../../src/middleware/error";
import { v4 as uuidv4 } from "uuid";
import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

// Define mocks first
const BookMock = dbMock.define("Book", {
  id: "mocked-uuid",
  author: "Test Author"
});

const TranslatableItemMock = dbMock.define("TranslatableItem", {
  id: "mocked-uuid",
  recordId: "mocked-uuid",
  recordType: "book",
  language: "en",
  key: "name",
  value: "Test Book"
});

// Ensure mock methods are recognized by Jest
BookMock.create = jest.fn();
BookMock.findAll = jest.fn();
BookMock.findByPk = jest.fn();
TranslatableItemMock.create = jest.fn();

// Mock the models AFTER defining them
jest.doMock("../../src/models/book", () => ({
  __esModule: true,
  default: BookMock
}));

jest.doMock("../../src/models/translatableItem", () => ({
  __esModule: true,
  default: TranslatableItemMock
}));

jest.mock("uuid", () => ({ v4: jest.fn(() => "mocked-uuid") }));

// Apply Associations AFTER the mocks are set up
beforeAll(() => {
  BookMock.hasMany(TranslatableItemMock, { foreignKey: "recordId", as: "TranslatableItems" });
  TranslatableItemMock.belongsTo(BookMock, { foreignKey: "recordId", as: "Book" });
});

describe("BookService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createBook - should create a book and return it", async () => {
    const mockBook = {
      id: "mocked-uuid",
      author: "Test Author",
      dataValues: { id: "mocked-uuid", author: "Test Author" }
    };
    const mockTranslatableItems = [
      {
        id: "mocked-uuid",
        recordId: "mocked-uuid",
        recordType: "book",
        language: "en",
        key: "name",
        value: "Test Book"
      },
      {
        id: "mocked-uuid-2",
        recordId: "mocked-uuid",
        recordType: "book",
        language: "en",
        key: "description",
        value: "Test Description"
      }
    ];

    (BookMock.create as jest.Mock).mockResolvedValue(mockBook);
    (TranslatableItemMock.create as jest.Mock).mockImplementation((item) => Promise.resolve({ ...item, id: uuidv4() }));

    // Ensure `readBook` returns the expected structure
    jest.spyOn(BookService, "readBook").mockResolvedValue({
      id: "mocked-uuid",
      author: "Test Author",
      names: [{ language: "en", value: "Test Book" }],
      descriptions: [{ language: "en", value: "Test Description" }]
    });

    const result = await BookService.createBook({
      author: "Test Author",
      names: [{ language: "en", value: "Test Book" }],
      descriptions: [{ language: "en", value: "Test Description" }]
    });

    expect(BookMock.create).toHaveBeenCalled();
    expect(TranslatableItemMock.create).toHaveBeenCalledTimes(2);
    expect(BookService.readBook).toHaveBeenCalledWith("mocked-uuid");
    expect(result).toEqual({
      id: "mocked-uuid",
      author: "Test Author",
      names: [{ language: "en", value: "Test Book" }],
      descriptions: [{ language: "en", value: "Test Description" }]
    });
  });

  test("readBook - should return book with translations", async () => {
    const mockBook = {
      id: "1",
      author: "Test Author",
      dataValues: {
        id: "1",
        author: "Test Author",
        TranslatableItems: [
          { language: "en", key: "name", value: "Test Book" },
          { language: "en", key: "description", value: "Test Description" }
        ]
      }
    };
    (BookMock.findByPk as jest.Mock).mockResolvedValue(mockBook);

    const result = await BookService.readBook("1");
    expect(BookMock.findByPk).toHaveBeenCalledWith("1", expect.any(Object));
    expect(result).toEqual({
      id: "1",
      author: "Test Author",
      names: [{ language: "en", value: "Test Book" }],
      descriptions: [{ language: "en", value: "Test Description" }]
    });
  });

  test("deleteBook - should delete a book when found", async () => {
    const mockBook = { destroy: jest.fn() };
    (BookMock.findByPk as jest.Mock).mockResolvedValue(mockBook);

    await BookService.deleteBook("1");
    expect(BookMock.findByPk).toHaveBeenCalledWith("1");
    expect(mockBook.destroy).toHaveBeenCalled();
  });

  test("deleteBook - should throw NotFoundError if book not found", async () => {
    (BookMock.findByPk as jest.Mock).mockResolvedValue(null);
    await expect(BookService.deleteBook("1")).rejects.toThrow(NotFoundError);
  });
});
