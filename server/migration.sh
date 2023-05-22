#!/bin/bash

echo "=== Flask-Migrate Migration Script ==="

read -p "Enter a migration message: " message

# Run the migration commands
flask db migrate -m "$message"
flask db upgrade

echo "Migration completed successfully"