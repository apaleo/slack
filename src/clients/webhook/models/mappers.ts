import * as coreHttp from "@azure/core-http";

export const MessageItemCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "MessageItemCollection",
    modelProperties: {
      messages: {
        serializedName: "messages",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const SubscriptionResponseModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SubscriptionResponseModel",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid"
        }
      },
      topic: {
        serializedName: "topic",
        type: {
          name: "Enum",
          allowedValues: [
            "Reservation",
            "Folio",
            "Invoice",
            "RatePlan",
            "Group",
            "Block",
            "Unit",
            "NightAudit",
            "Fiscalization",
            "Booking",
            "Company",
            "UnitGroup"
          ]
        }
      },
      topics: {
        serializedName: "topics",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "Reservation",
                "Folio",
                "Invoice",
                "RatePlan",
                "Group",
                "Block",
                "Unit",
                "NightAudit",
                "Fiscalization",
                "Booking",
                "Company",
                "UnitGroup"
              ]
            }
          }
        }
      },
      endpoint: {
        serializedName: "endpoint",
        type: {
          name: "String"
        }
      },
      endpointUrl: {
        serializedName: "endpointUrl",
        required: true,
        type: {
          name: "String"
        }
      },
      created: {
        serializedName: "created",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      propertyId: {
        serializedName: "propertyId",
        type: {
          name: "String"
        }
      },
      propertyIds: {
        serializedName: "propertyIds",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const CreateSubscriptionRequestModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateSubscriptionRequestModel",
    modelProperties: {
      endpointUrl: {
        serializedName: "endpointUrl",
        required: true,
        type: {
          name: "String"
        }
      },
      topic: {
        serializedName: "topic",
        type: {
          name: "Enum",
          allowedValues: [
            "Reservation",
            "Folio",
            "Invoice",
            "RatePlan",
            "Group",
            "Block",
            "Unit",
            "NightAudit",
            "Fiscalization",
            "Booking",
            "Company",
            "UnitGroup"
          ]
        }
      },
      propertyId: {
        serializedName: "propertyId",
        type: {
          name: "String"
        }
      },
      topics: {
        serializedName: "topics",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "Reservation",
                "Folio",
                "Invoice",
                "RatePlan",
                "Group",
                "Block",
                "Unit",
                "NightAudit",
                "Fiscalization",
                "Booking",
                "Company",
                "UnitGroup"
              ]
            }
          }
        }
      },
      propertyIds: {
        serializedName: "propertyIds",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const CreateSubscriptionResponseModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateSubscriptionResponseModel",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "Uuid"
        }
      }
    }
  }
};

export const ErrorResponseModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponseModel",
    modelProperties: {
      type: {
        serializedName: "type",
        type: {
          name: "Enum",
          allowedValues: [
            "HealthcheckFailed",
            "EnabledForAnotherEndpoint",
            "InvalidPropertyId"
          ]
        }
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ReplaceSubscriptionModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ReplaceSubscriptionModel",
    modelProperties: {
      endpointUrl: {
        serializedName: "endpointUrl",
        required: true,
        type: {
          name: "String"
        }
      },
      topics: {
        serializedName: "topics",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "Reservation",
                "Folio",
                "Invoice",
                "RatePlan",
                "Group",
                "Block",
                "Unit",
                "NightAudit",
                "Fiscalization",
                "Booking",
                "Company",
                "UnitGroup"
              ]
            }
          }
        }
      },
      propertyIds: {
        serializedName: "propertyIds",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};
