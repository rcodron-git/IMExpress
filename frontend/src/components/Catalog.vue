<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <div v-if="catalog.length">
      <h2>Catalog Items</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>SubCategory</th>
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
            <td>{{ item.subCategory }}</td>
            <td>{{ item.vendorName }}</td>
            <td>{{ item.vendorPartNumber }}</td>
            <td>{{ item.upcCode }}</td>
            <td>{{ item.authorizedToPurchase }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="subscriptionCatalog.length">
      <h2>Subscription Plans</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Description</th>
            <th>Subscription Period</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in subscriptionCatalog" :key="plan.planId">
            <td>{{ plan.planName }}</td>
            <td v-html="plan.planDescription"></td>
            <td>{{ plan.subscriptionPeriodSummary[0].subscriptionPeriod }} {{ plan.subscriptionPeriodSummary[0].subscriptionPeriodUnit }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="pageNumber === 1">Previous</button>
      <span>Page {{ pageNumber }}</span>
      <button @click="goToNextPage" :disabled="!nextPageUrl">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../assets/eventBus';

export default {
  setup() {
    const catalog = ref([]);
    const subscriptionCatalog = ref([]);
    const pageNumber = ref(1);
    const pageSize = ref(25);
    const nextPageUrl = ref(null);
    const router = useRouter();

    const message = {
      error: (msg) => {
        console.error(msg);
        alert(msg); // Example: using alert to display the message
      },
    };

    const fetchCatalog = async () => {
      const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
      if (!token) {
        console.error('No token found');
        handleUnauthorized('No token found');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await axios.get(`http://localhost:3000/api/catalog?pageSize=${pageSize.value}&pageNumber=${pageNumber.value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Catalog data:', response.data);
        catalog.value = response.data.catalog;
        subscriptionCatalog.value = response.data.subscriptionCatalog[0]?.plans || [];
        nextPageUrl.value = response.data.nextPage;
        console.log('Catalog:', catalog.value);
        console.log('Subscription Catalog:', subscriptionCatalog.value);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
        if (error.response) {
          if (error.response.status === 401) {
            handleUnauthorized(error.response.data.message);
          } else if (error.response.status === 403) {
            handleForbidden(error.response.data.message);
          } else if (error.response.status === 500) {
            handleServerError(error.response.data.message);
          } else {
            handleOtherError(error.response.status);
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          message.error('No response received from the server');
        } else {
          console.error('Error:', error.message);
          message.error(`Error: ${error.message}`);
        }
      }
    };

    const handleUnauthorized = (msg) => {
      sessionStorage.removeItem('token');
      eventBus.emit('deauth');
      router.push('/');
      message.error(msg || 'Unauthorized request');
      console.error(msg || 'Unauthorized request');
    };

    const handleForbidden = (msg) => {
      sessionStorage.removeItem('token');
      eventBus.emit('deauth');
      router.push('/');
      message.error(msg || 'Forbidden request');
      console.error(msg || 'Forbidden request');
    };

    const handleServerError = (msg) => {
      sessionStorage.removeItem('token');
      eventBus.emit('deauth');
      router.push('/');
      message.error(`Server Error: ${msg}`);
      console.error(`Server Error: ${msg}`);
    };

    const handleOtherError = (status) => {
      sessionStorage.removeItem('token');
      eventBus.emit('deauth');
      router.push('/');
      message.error(`Error: ${status}`);
      console.error(`Error: ${status}`);
    };

    const goToNextPage = () => {
      if (nextPageUrl.value) {
        pageNumber.value++;
        fetchCatalog();
      }
    };

    const prevPage = () => {
      if (pageNumber.value > 1) {
        pageNumber.value--;
        fetchCatalog();
      }
    };

    onMounted(() => {
      fetchCatalog();
    });

    return {
      catalog,
      subscriptionCatalog,
      pageNumber,
      nextPageUrl,
      goToNextPage,
      prevPage,
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
}
</style>