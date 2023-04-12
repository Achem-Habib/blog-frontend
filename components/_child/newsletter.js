export default function newsletter() {
  return (
    <div className="flex items-center justify-center mx-2 my-12 w-96">
      <div className="flex items-center justify-center">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 sm:px-14 sm:py-8">
          <div>
            <div className="flex flex-col pb-4">
              <span className="mx-auto">
                <svg
                  className="fill-purple-800 dark:fill-sky-400"
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                >
                  <path d="M6.125 33.333q-1.125 0-1.958-.833-.834-.833-.834-1.958V9.458q0-1.125.834-1.958.833-.833 1.958-.833h27.75q1.125 0 1.958.833.834.833.834 1.958v21.084q0 1.125-.834 1.958-.833.833-1.958.833Zm27.75-21.25-13.125 8.5q-.208.084-.375.146-.167.063-.375.063t-.375-.063q-.167-.062-.375-.146l-13.125-8.5v18.459h27.75ZM20 18.292l13.792-8.834H6.25ZM6.125 12.083v.334V10.5v.042-1.084 1.084-.042V12.417v-.334 18.459Z" />
                </svg>
              </span>
              <span className="text-3xl font-bold text-purple-800 dark:text-sky-400 mx-auto">
                Join our Newsletter
              </span>
            </div>
            <div className="pb-1 text-md  text-gray-800 w-72 dark:text-gray-100">
              Stay updated, receive the latest post straight to your mailbox
            </div>
            <form className="flex flex-col">
              <div>
                <label className="sr-only" htmlFor="email-input">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="px-4 rounded-md w-72 dark:bg-black focus:outline-none focus:ring-2 focus:border-transparent focus:ring-primary-600"
                  id="email-input"
                  name="email"
                  placeholder="Enter your email"
                  required=""
                  type="email"
                />
              </div>
              <div className="mt-2 rounded-md shadow-sm">
                <button
                  className="py-2 w-72 bg-purple-800 dark:bg-sky-500 px-4 rounded-md font-medium text-white  hover:bg-primary-700 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 dark:ring-offset-black"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
