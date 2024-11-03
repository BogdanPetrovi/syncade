import React, { createContext, useState, useEffect } from "react";
import verify from "../components/Authentication/isAuthenticated";
import fetch from '../apis/fetch';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserData = async (userData) => {
    try {
      setUser(userData);
      const teams = await fetch.get('/user/teams'); //Backend got hold of user through cookie
      setTeams(teams.data.teams.rows);

      setProjects([]); //Fixed a bug where user log in into new account, but projects from old account stays
      teams.data.teams.rows.map(async (team) => {
        const newProjects = await fetch.get(`/team/projects/${team.id}`)
        setProjects(projects => [...projects, ...newProjects.data.projects.rows])
      })
  
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  useEffect(() => {
    async function checkIsAuthenticated() {
      try {
        const result = await verify();
        if (result) {
          await loadUserData(result);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    }

    checkIsAuthenticated();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        teams,
        projects,
        loading,
        loadUserData
      }}
    > 
      {props.children}
    </UserContext.Provider>
  );
};