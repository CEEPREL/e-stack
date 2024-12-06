import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext/GlobalContext";

interface UserDropdownProps {
  handleLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ handleLogin }) => {
  const { currentUser, userDataObj, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {currentUser ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
              {currentUser?.displayName
                ?.split(" ")
                .map((namePart, index, arr) => {
                  if (index === 0 || index === arr.length - 1) {
                    return namePart[0].toUpperCase();
                  }
                  return "";
                })
                .join("")}
            </div>
          ) : (
            <Button onClick={handleLogin}>Login</Button>
          )}
        </DropdownMenuTrigger>

        {currentUser && (
          <DropdownMenuContent className="w-56 shadow-md bg-white rounded-md">
            <div className="px-4 py-2">
              <p className="font-medium">{` ${
                userDataObj?.lastName || currentUser.displayName
              }`}</p>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
            <div className="border-t border-gray-200" />
            <DropdownMenuItem className="px-4 py-2">
              {/* <Button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
