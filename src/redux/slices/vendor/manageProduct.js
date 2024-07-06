import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

const base = process.env.NEXT_PUBLIC_BASE_URL;

// Toggle isActive status
export const toggleIsActive = createAsyncThunk(
  'product/toggleIsActive',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base}/vendor/product/inactive-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return { ...response.data, productId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${base}/vendor/product/delete-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return { ...response.data, productId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base}/vendor/product/get-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch product categories
export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base}/admin/category/get-product-category`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base}/vendor/product/update-product/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleIsActive.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleIsActive.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId, isActive } = action.payload;
        const existingProduct = state.products.find(product => product.id === productId);
        if (existingProduct) {
          existingProduct.isActive = isActive;
        }
      })
      .addCase(toggleIsActive.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId } = action.payload;
        state.products = state.products.filter(product => product.id !== productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
