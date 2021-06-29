import * as coreHttp from "@azure/core-http";

export const AccountModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AccountModel",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      defaultLanguage: {
        serializedName: "defaultLanguage",
        required: true,
        type: {
          name: "String"
        }
      },
      logoUrl: {
        serializedName: "logoUrl",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "Composite",
          className: "AddressModel"
        }
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["Trial", "Live", "Suspended", "Development"]
        }
      },
      additionallySupportedCountries: {
        serializedName: "additionallySupportedCountries",
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

export const AddressModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AddressModel",
    modelProperties: {
      addressLine1: {
        serializedName: "addressLine1",
        required: true,
        type: {
          name: "String"
        }
      },
      addressLine2: {
        serializedName: "addressLine2",
        type: {
          name: "String"
        }
      },
      postalCode: {
        serializedName: "postalCode",
        required: true,
        type: {
          name: "String"
        }
      },
      city: {
        serializedName: "city",
        required: true,
        type: {
          name: "String"
        }
      },
      regionCode: {
        serializedName: "regionCode",
        type: {
          name: "String"
        }
      },
      countryCode: {
        serializedName: "countryCode",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

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

export const ReplaceAccountModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ReplaceAccountModel",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      logoUrl: {
        serializedName: "logoUrl",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "Composite",
          className: "CreateAddressModel"
        }
      },
      additionallySupportedCountries: {
        serializedName: "additionallySupportedCountries",
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

export const CreateAddressModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateAddressModel",
    modelProperties: {
      addressLine1: {
        serializedName: "addressLine1",
        required: true,
        type: {
          name: "String"
        }
      },
      addressLine2: {
        serializedName: "addressLine2",
        type: {
          name: "String"
        }
      },
      postalCode: {
        serializedName: "postalCode",
        required: true,
        type: {
          name: "String"
        }
      },
      city: {
        serializedName: "city",
        required: true,
        type: {
          name: "String"
        }
      },
      regionCode: {
        constraints: {
          MaxLength: 6,
          MinLength: 2
        },
        serializedName: "regionCode",
        type: {
          name: "String"
        }
      },
      countryCode: {
        constraints: {
          MaxLength: 2,
          MinLength: 2
        },
        serializedName: "countryCode",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AccountListModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AccountListModel",
    modelProperties: {
      accounts: {
        serializedName: "accounts",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AccountItemModel"
            }
          }
        }
      },
      count: {
        serializedName: "count",
        required: true,
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const AccountItemModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AccountItemModel",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["Trial", "Live", "Suspended", "Development"]
        }
      }
    }
  }
};

export const CreateAccountModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CreateAccountModel",
    modelProperties: {
      code: {
        constraints: {
          Pattern: new RegExp("^[a-zA-Z0-9_]*$"),
          MaxLength: 10,
          MinLength: 3
        },
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      defaultLanguage: {
        constraints: {
          MaxLength: 2,
          MinLength: 2
        },
        serializedName: "defaultLanguage",
        required: true,
        type: {
          name: "String"
        }
      },
      logoUrl: {
        serializedName: "logoUrl",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "Enum",
          allowedValues: ["Trial", "Live", "Suspended", "Development"]
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "Composite",
          className: "CreateAddressModel"
        }
      },
      additionallySupportedCountries: {
        serializedName: "additionallySupportedCountries",
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

export const AccountCreatedModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "AccountCreatedModel",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ApaleoAccountAPIAccountAccountsPostHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ApaleoAccountAPIAccountAccountsPostHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};
