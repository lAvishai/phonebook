<template>
  <div class="search-controls">

    <!-- Simple Search -->
    <div v-if="currentMode === 'simple'" class="search-row">
      <div class="search-field">
        <input 
          type="text" 
          v-model="searchForm.employeeId"
          @input="handleInputSearch"
          placeholder="מספר עובד"
          class="input-field"
        />
        <button class="clear-btn" @click="clearField('employeeId')" v-if="searchForm.employeeId">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="search-field">
        <input 
          type="text" 
          v-model="searchForm.lastName"
          @input="handleInputSearch"
          placeholder="שם משפחה"
          class="input-field"
        />
        <button class="clear-btn" @click="clearField('lastName')" v-if="searchForm.lastName">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="search-field">
        <input 
          type="text" 
          v-model="searchForm.firstName"
          @input="handleInputSearch"
          placeholder="שם פרטי"
          class="input-field"
        />
        <button class="clear-btn" @click="clearField('firstName')" v-if="searchForm.firstName">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Basic Search -->
    <div v-if="currentMode === 'basic'" class="search-form">
      <div class="search-box">
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <input 
          type="text" 
          v-model="searchForm.searchText"
          @input="handleInputSearch"
          placeholder="חפש עובדים"
          class="search-input"
        />
        <button class="delete-btn" @click="clearField('searchText')" v-if="searchForm.searchText">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="clear-btn" @click="clearField('searchText')" v-if="searchForm.searchText">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Advanced Search -->
    <div v-if="currentMode === 'advanced'" class="search-form">
      <div class="search-row">
        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.employeeId"
            @input="handleInputSearch"
            placeholder="מספר עובד"
            class="input-field"
          />
          <button class="clear-btn" @click="clearField('employeeId')" v-if="searchForm.employeeId">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="search-field">
          <select v-model="searchForm.department" class="select-field">
            <option value="">אגף</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <div class="search-field">
          <select v-model="searchForm.employeeType" class="select-field">
            <option value="">סוג עובד</option>
            <option v-for="type in employeeTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <div class="search-row">
        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.firstName"
            @input="handleInputSearch"
            placeholder="שם פרטי"
            class="input-field"
          />
          <button class="clear-btn" @click="clearField('firstName')" v-if="searchForm.firstName">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.lastName"
            @input="handleInputSearch"
            placeholder="שם משפחה"
            class="input-field"
          />
          <button class="clear-btn" @click="clearField('lastName')" v-if="searchForm.lastName">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="search-field">
          <select v-model="searchForm.status" class="select-field">
            <option value="">יחידה</option>
            <option v-for="unit in units" :key="unit" :value="unit">
              {{ unit }}
            </option>
          </select>
        </div>
      </div>

      <div class="search-row">
        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.phone"
            placeholder="טלפון נייד"
            class="input-field"
          />
        </div>

        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.officePhone"
            placeholder="טלפון משרד"
            class="input-field"
          />
        </div>

        <div class="search-field">
          <input 
            type="text" 
            v-model="searchForm.email"
            placeholder="דוא״ל"
            class="input-field"
          />
        </div>
      </div>
    </div>

    
    <div class="actions-row">
      <button class="search-btn" @click="handleSearch">
        <i class="fas fa-search"></i>
        חיפוש
      </button>
    </div>

    
    <div class="mode-selection">
      <div class="mode-tabs">
        <button 
          v-for="mode in searchModes" 
          :key="mode.id"
          :class="['mode-btn', { active: currentMode === mode.id }]"
          @click="setSearchMode(mode.id)"
        >
          {{ mode.label }}
        </button>
      </div>
      <div class="mode-options">
        <label><input type="checkbox" v-model="filters.myFavorites"> מועדפים שלי</label>
        <label><input type="checkbox" v-model="filters.myContacts"> עובדים שלי</label>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SearchControls',
  props: {
    departments: {
      type: Array,
      required: true
    },
    employeeTypes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentMode: 'simple',
      searchModes: [
        { id: 'simple', label: 'מצומצמת' },
        { id: 'basic', label: 'מורחבת' },
        { id: 'advanced', label: 'מתקדם' }
      ],
      searchForm: {
        searchText: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        department: '',
        employeeType: '',
        status: '',
        phone: '',
        officePhone: '',
        email: ''
      },
      filters: {
        myContacts: false,
        myFavorites: false
      },
      units: ['מטה', 'סניף', 'שטח'],
      searchTimeout: null
    }
  },
  methods: {
    setSearchMode(mode) {
      this.currentMode = mode
      this.clearAllFields()
    },
    handleSearch() {
      this.$emit('search', { 
        ...this.searchForm, 
        searchMode: this.currentMode,
        myContacts: this.filters.myContacts,
        myFavorites: this.filters.myFavorites
      })
    },
    clearField(field) {
      this.searchForm[field] = ''
      this.handleInputSearch()
    },
    clearAllFields() {
      Object.keys(this.searchForm).forEach(key => {
        this.searchForm[key] = ''
      })
      this.handleInputSearch()
    },
    handleInputSearch() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      
      this.searchTimeout = setTimeout(() => {
        this.handleSearch()
      }, 300)
    }
  },
  watch: {
    'searchForm.department'() {
      this.handleSearch()
    },
    'searchForm.employeeType'() {
      this.handleSearch()
    },
    'searchForm.status'() {
      this.handleSearch()
    },
    'filters.myContacts'() {
      this.handleSearch()
    },
    'filters.myFavorites'() {
      this.handleSearch()
    }
  }
}
</script>

<style scoped>
.search-controls {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-modes {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.mode-selection {
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

.mode-tabs {
  display: flex;
  gap: 1rem;
}

.mode-options {
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
}

.mode-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  white-space: nowrap;
}

.mode-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s;
}

.mode-btn.active {
  background-color: #3b5998;
  color: white;
}

.mode-btn:hover:not(.active) {
  background-color: #f0f2f5;
}

.search-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-field {
  flex: 1;
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 0.5rem;
  gap: 0.5rem;
}

.search-icon {
  color: #666;
  padding: 0 0.5rem;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  padding: 0.5rem;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
}

.input-field, .select-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #3b5998;
  box-shadow: 0 0 0 2px rgba(59, 89, 152, 0.1);
}

.clear-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover, .delete-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.search-form {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.actions-row {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.search-btn {
  background-color: #3b5998;
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #324b81;
}

.search-btn i {
  font-size: 0.9rem;
}
</style> 