echo "Building current branch..."
npm run build
git add dist/
git commit -m "Add latest version of dist folder"
exit 0
