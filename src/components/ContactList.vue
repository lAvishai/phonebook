<template>
  <div class="contact-list">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>טלפון</th>
          <th>מספר עובד</th>
          <th>סטטוס</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id" class="contact-row">
          <td>
            <button 
              class="favorite-btn"
              :class="{ 'is-favorite': contact.isFavorite }"
              @click="toggleFavorite(contact.id)"
            >
              <i class="fas fa-star"></i>
            </button>
          </td>
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>
            <a :href="`tel:${contact.phone}`" class="phone-link">
              {{ formatPhone(contact.phone) }}
            </a>
          </td>
          <td>{{ contact.employeeId }}</td>
          <td>
            <span class="status-indicator" :class="contact.status">
              <i class="fas fa-circle"></i>
            </span>
          </td>
          <td>
            <img 
              :src="contact.avatar || '@/assets/default-avatar.png'" 
              :alt="`${contact.firstName} ${contact.lastName}`"
              class="avatar"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatPhone(phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    },
    toggleFavorite(contactId) {
      this.$emit('toggle-favorite', contactId)
    }
  }
}
</script>

<style scoped>
.contact-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: right;
  padding: 1rem;
  border-bottom: 2px solid #eee;
  font-weight: 600;
  color: #666;
}

.contact-row {
  border-bottom: 1px solid #eee;
}

td {
  padding: 1rem;
  vertical-align: middle;
}

.favorite-btn {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1.2rem;
}

.favorite-btn.is-favorite {
  color: #ffd700;
}

.phone-link {
  color: #3b5998;
  text-decoration: none;
}

.phone-link:hover {
  text-decoration: underline;
}

.status-indicator {
  font-size: 0.8rem;
}

.status-indicator.online {
  color: #4caf50;
}

.status-indicator.offline {
  color: #ccc;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
</style> 