import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext/GlobalContext";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}
interface UserDropdownProps {
  handleLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ handleLogin }) => {
  const [user, setUser] = useState<User | null>(null);
  const { currentUser, userDataObj } = useAuth();

  useEffect(() => {
    // Simulate fetching user data (replace with Firebase logic)
    const newUser = {
      firstName: "Bolu",
      lastName: "Agboola",
      email: "ceeprel3@gmail.com",
    };
    setUser(newUser);
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleLogout = () => {
    console.log("User logged out");
    setUser(null); // Clear user data on logout
  };

  return (
    <div className="relative">
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          {user ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
              {user.firstName[0].toUpperCase()}
              {user.lastName[0].toUpperCase()}
            </div>
          ) : (
            <Button onClick={handleLogin} className="bg-gray-500 text-white">
              Login
            </Button>
          )}
        </DropdownMenuTrigger>

        {user && (
          <DropdownMenuContent className="w-56 shadow-md bg-white rounded-md">
            <div className="px-4 py-2">
              <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="border-t border-gray-200" />
            <DropdownMenuItem className="px-4 py-2">
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
