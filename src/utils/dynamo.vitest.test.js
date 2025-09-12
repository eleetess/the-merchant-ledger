import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { describe, it, expect, beforeEach } from "vitest";
import { createItem, listAllItems, updateItem, deleteItem } from "./dynamo";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("CRUD unit tests with mock", () => {
  it("createItem returns the same item", async () => {
    ddbMock.on(PutCommand).resolves({}); // dynamodb put command returns a {} when successful

    const item = { id: "1", username: "superman35" };

    const output = await createItem("Test", item);

    expect(output).toEqual(item);
  });

  it("ListAllItems returns an array", async () => {
    const mockItems = [{ id: "1" }, { id: "2" }];
    ddbMock.on(ScanCommand).resolves({ Items: mockItems });

    const output = await listAllItems("Test");

    expect(output).toEqual(mockItems);
  });

  it("ListAllItems returns an empty array when empty", async () => {
    ddbMock.on(ScanCommand).resolves({});

    const output = await listAllItems("Test");

    expect(output).toEqual([]);
  });

  // write more tests here

  it("updateItem returns the updated item", async () => {
    const updatedItem = { id: "1", username: "batman99" };

    ddbMock.on(UpdateCommand).resolves({ Attributes: updatedItem });

    const output = await updateItem(
      "Test",
      { id: "1" },
      { username: "batman99" }
    );

    expect(output).toEqual(updatedItem);
  });

  it("deleteItem returns the deleted item", async () => {
    const deletedItem = { id: "1" };

    ddbMock.on(DeleteCommand).resolves({ Attributes: deletedItem });

    const output = await deleteItem("Test", { id: "1" });

    expect(output).toEqual(deletedItem);
  });
});
