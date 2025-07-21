function Layout({ children }) {
    return (
        <>
            <Navbar />
            <FavoriteSidebar />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;