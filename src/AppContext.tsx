import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ISkill } from './interfaces';
import { useQuery, gql } from '@apollo/client';

interface IAppContext {
	appTitle: string;
	jobs: IJob[];
	skills: ISkill[];
	message: string;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const appTitle = 'Info Site';
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [skills, setSkills] = useState<ISkill[]>([]);
	const [message, setMessage] = useState('');

	// "useQuery" in GraphQL is like axios in REST
	const { loading, data } = useQuery(gql`
		{
			message,
			jobs {
				title
			},
			skills {
				name,
				description
			}
		}
	`);

	useEffect(() => {
		if (!loading) {
			setMessage(data.message);
			setJobs(data.jobs);
			setSkills(data.skills);
		}
	}, [loading]);

	return (
		<AppContext.Provider
			value={{
				appTitle,
				jobs,
				skills,
				message,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
