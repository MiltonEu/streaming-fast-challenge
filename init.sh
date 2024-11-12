setup_project() {
    local project_dir=$1

    echo "Setting up project in $project_dir"

    cd $project_dir


    npm install

   
    echo "GOOGLE_API_KEY=" > .env

    cd ..
}


setup_project "basic"


setup_project "parallel"

echo "Setup complete for both projects. Please fill in the GOOGLE_API_KEY in the .env files."
