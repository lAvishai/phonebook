<template>
  <div class="phone-directory">
    <h1>ספר טלפונים וזכרונות</h1>
    
    <SearchControls 
      @search="handleSearch"
      :departments="departments"
      :employeeTypes="employeeTypes"
    />

    <ContactList 
      :contacts="filteredContacts"
      @toggle-favorite="toggleFavorite"
    />

    <div class="pagination">
      <span>סה"כ תוצאות: {{ totalResults }}</span>
      <span>עמוד {{ currentPage }} מתוך {{ totalPages }}</span>
    </div>
  </div>
</template>

<script>
import SearchControls from '@/components/SearchControls.vue'
import ContactList from '@/components/ContactList.vue'
import { contacts, departments, employeeTypes } from '@/mock/contacts'

export default {
  name: 'PhoneDirectory',
  components: {
    SearchControls,
    ContactList
  },
  data() {
    return {
      filters: {
        searchText: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        department: '',
        employeeType: '',
        status: '',
        phone: '',
        officePhone: '',
        email: '',
        myContacts: false,
        myFavorites: false,
        searchMode: 'simple'
      },
      contacts: contacts,
      departments: departments,
      employeeTypes: employeeTypes,
      currentPage: 1,
      totalPages: Math.ceil(contacts.length / 10),
      totalResults: contacts.length
    }
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => {
        // Check favorites and contacts filters
        if (this.filters.myFavorites && !contact.isFavorite) return false
        if (this.filters.myContacts && !contact.isContact) return false
        
        // Basic search mode
        if (this.filters.searchMode === 'basic' && this.filters.searchText) {
          const searchText = this.filters.searchText.toLowerCase()
          const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
          return fullName.includes(searchText) || 
                 contact.employeeId.includes(searchText)
        }

        // Simple search mode
        if (this.filters.searchMode === 'simple') {
          if (this.filters.employeeId && !contact.employeeId.includes(this.filters.employeeId)) {
            return false
          }

          if (this.filters.firstName) {
            const firstName = contact.firstName.toLowerCase()
            if (!firstName.includes(this.filters.firstName.toLowerCase())) {
              return false
            }
          }

          if (this.filters.lastName) {
            const lastName = contact.lastName.toLowerCase()
            if (!lastName.includes(this.filters.lastName.toLowerCase())) {
              return false
            }
          }
        }

        // Advanced search mode
        if (this.filters.searchMode === 'advanced') {
          if (this.filters.employeeId && !contact.employeeId.includes(this.filters.employeeId)) {
            return false
          }

          if (this.filters.firstName) {
            const firstName = contact.firstName.toLowerCase()
            if (!firstName.includes(this.filters.firstName.toLowerCase())) {
              return false
            }
          }

          if (this.filters.lastName) {
            const lastName = contact.lastName.toLowerCase()
            if (!lastName.includes(this.filters.lastName.toLowerCase())) {
              return false
            }
          }

          if (this.filters.department && contact.department !== this.filters.department) {
            return false
          }

          if (this.filters.employeeType && contact.employeeType !== this.filters.employeeType) {
            return false
          }

          if (this.filters.status && contact.status !== this.filters.status) {
            return false
          }

          if (this.filters.phone && !contact.mobilePhone.includes(this.filters.phone)) {
            return false
          }

          if (this.filters.officePhone && !contact.officePhone.includes(this.filters.officePhone)) {
            return false
          }

          if (this.filters.email && !contact.email.toLowerCase().includes(this.filters.email.toLowerCase())) {
            return false
          }
        }

        return true
      })
    }
  },
  methods: {
    handleSearch(searchData) {
      this.filters = {
        ...this.filters,
        ...searchData
      }
    },
    toggleFavorite(contactId) {
      const contact = this.contacts.find(c => c.id === contactId)
      if (contact) {
        contact.isFavorite = !contact.isFavorite
      }
    }
  },
  watch: {
    filteredContacts: {
      handler(newContacts) {
        this.totalResults = newContacts.length
        this.totalPages = Math.ceil(newContacts.length / 10)
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.phone-directory {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: right;
  color: #333;
  margin-bottom: 2rem;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  color: #666;
}
</style> 