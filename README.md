# VD Shoppers

Welcome to VD Shoppers! This is a premium shopping website where you can find and purchase products from top-notch brands.

## Technologies Used

- **Next.js**: A React framework for building fast, server-rendered applications with ease.
- **Tailwind CSS**: A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
- **Prisma**: An ORM (Object-Relational Mapping) tool for Node.js and TypeScript that makes database access easy with an auto-generated query builder.
- **Shadcn**: A component library providing modern, customizable UI components.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.22.x)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/VyomOp2/vd-shoppers.git
    cd vd-shoppers
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the database:**

    Create a `.env` file in the root of your project and add your database connection string. Example:

    ```env
    DATABASE_URL="your-database-connection-string"
    ```

    Then, run the following command to apply the Prisma migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

4. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `pages/` - Contains the Next.js pages.
- `components/` - Contains the React components.
- `styles/` - Contains the Tailwind CSS styles.
- `prisma/` - Contains the Prisma schema.

## Documentation

Refer to the documentation of the respective technologies for more information:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Shadcn Documentation](https://shadcn.dev/docs)

## Contributing

We welcome contributions to improve VD Shoppers. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

Happy shopping with VD Shoppers!
