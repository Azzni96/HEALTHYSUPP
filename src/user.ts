// Define a User interface
interface User {
    id: number;
    username: string;
    email: string;
  }

  // Fetch and render the list of users
  async function loadUsers(): Promise<void> {
    try {
      const response = await fetch('/api/auth/users'); // Adjust the endpoint if needed

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users: User[] = await response.json();
      const userList = document.getElementById('user-list') as HTMLTableSectionElement;

      if (!userList) {
        console.error('User list element not found');
        return;
      }

      userList.innerHTML = ''; // Clear existing rows

      users.forEach((user: User) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>
            <button onclick="deleteUser(${user.id})" class="delete-button">Delete</button>
          </td>
        `;
        userList.appendChild(row);
      });
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Failed to load users');
    }
  }

  // Delete a user
  async function deleteUser(userId: number): Promise<void> {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/auth/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('User deleted successfully!');
          loadUsers(); // Reload the user list
        } else {
          const errorData = await response.json();
          alert('Failed to delete user: ' + (errorData.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error instanceof Error) {
          alert('An error occurred: ' + error.message);
        } else {
          alert('An unknown error occurred');
        }
      }
    }
  }

  // Load users when the page is ready
  document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
  });

  // Make the deleteUser function globally accessible
  (window as any).deleteUser = deleteUser;
