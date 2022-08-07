exports.up = function(knex) {
	return knex.schema
		.createTable('users', (table) => {
			table.increments('id').primary();
			table.integer('github_id');
			table.string('avatar_url');
			table.string('username').notNullable();
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('exercises', (table) => {
			table.increments('id').primary();
			table.integer('creator_id').unsigned().notNullable();
			table.string('title', 50).notNullable();
			table.string('equipment', 50).notNullable();
			table.string('description', 255);
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			table
				.foreign('creator_id')
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
		.createTable('comments', (table) => {
			table.increments('id').primary();
			table.integer('exercise_id').unsigned().notNullable();
			table.string('comment', 255).notNullable();
			table.string('name').notNullable();
			table
				.foreign('exercise_id')
				.references('id')
				.inTable('exercises')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTable('comments').dropTable('exercises').dropTable('users');
};
