import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildStorageService } from "../../../../infrastructure/frontend/storage-service/storage-service";

export const getUserTheme = createAsyncThunk<
  boolean,
  void,
  {
    extra: {
      services: {
        storageService: ReturnType<typeof buildStorageService>;
      };
    };
  }
>(
  "ui/get-user-theme",
  async (
    _,
    {
      extra: {
        services: { storageService },
      },
    }
  ) => {
    const userTheme = storageService.getItem("blog-theme");
    return userTheme === "light";
  }
);
