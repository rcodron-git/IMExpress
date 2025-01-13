<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Vendor</th>
          <th>Part Number</th>
          <th>UPC Code</th>
          <th>Authorized to Purchase</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in catalog" :key="item.ingramPartNumber">
          <td>{{ item.description }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.vendorName }}</td>
          <td>{{ item.vendorPartNumber }}</td>
          <td>{{ item.upcCode }}</td>
          <td>{{ item.authorizedToPurchase }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const catalog = ref([]);

    const fetchCatalog = async () => {
      const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await axios.get('/api/catalog').catch((error) => {
          console.error('Error fetching catalog data:', error);
        });
        //console.log('Catalog data:', response.data);
        //catalog.value = response.data;
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    onMounted(() => {
      fetchCatalog();
    });

    return {
      catalog,
    };
  },
};
</script>

<style scoped>
.catalog {
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>