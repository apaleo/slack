import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
  QueryCollectionFormat
} from "@azure/core-http";
import {
  ReplaceAccountModel as ReplaceAccountModelMapper,
  CreateAccountModel as CreateAccountModelMapper
} from "../models/mappers";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const body: OperationParameter = {
  parameterPath: "body",
  mapper: ReplaceAccountModelMapper
};

export const accept1: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const accountCodes: OperationQueryParameter = {
  parameterPath: ["options", "accountCodes"],
  mapper: {
    serializedName: "accountCodes",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: QueryCollectionFormat.Csv
};

export const body1: OperationParameter = {
  parameterPath: "body",
  mapper: CreateAccountModelMapper
};

export const idempotencyKey: OperationParameter = {
  parameterPath: ["options", "idempotencyKey"],
  mapper: {
    serializedName: "Idempotency-Key",
    type: {
      name: "String"
    }
  }
};
