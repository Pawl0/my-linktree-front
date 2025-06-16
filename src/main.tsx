import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AdminPageWrapper } from './pages/admin/admin-page-wrapper.tsx';
import { SignInPage } from './pages/signin/signin-page.tsx';
import { ToastContainer } from 'react-toastify';
import { SignUpPage } from './pages/signup/signup-page.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route
					path="/admin"
					element={<AdminPageWrapper />}
				/>
				<Route path=":username" element={<App />} />
			</Routes>
		</BrowserRouter>
		<ToastContainer pauseOnHover theme="dark" />
	</StrictMode>
);
