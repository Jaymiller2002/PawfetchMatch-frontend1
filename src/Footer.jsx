import './App.css'

function Footer() {
  return (
    <footer>
      <div>
        <p>&copy; {new Date().getFullYear()} Doglist. All rights reserved.</p>
        <p>342 E Main St, Lexington, KY</p>
        <p>Email: jay.miller02@icloud.com | Phone: (859) 475-8431</p>
      </div>
      <div>
        <a
          href="https://portfolio-landing-page-o5j8sij4y-jaymiller2002s-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out my portfolio project
        </a>
      </div>
    </footer>
  );
}

export default Footer;