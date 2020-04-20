import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './sap_profile_ms_api/profileTypeDef';

import {
	canvasMutations,
	canvasQueries,
	canvasTypeDef
} from './sap_canvas_ms_api/canvasTypeDef';

import usersResolvers from './sap_profile_ms_api/resolvers';
import canvasResolvers from './sap_canvas_ms_api/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		canvasTypeDef
	],
	[
		usersQueries,
		canvasQueries
	],
	[
		usersMutations,
		canvasMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usersResolvers,
		canvasResolvers
	)
});

