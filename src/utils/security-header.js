/**
 * Middleware function to set security headers in HTTP responses.
 * @param {object} request The HTTP request object.
 * @param {object} response The HTTP response object.
 * @param {function} next The next middleware function.
 */
const setSecurityHeaders = (request, response, next) => {
	// Set Content-Security-Policy header to restrict resource loading and execution
	response.setHeader("Content-Security-Policy", "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://use.fontawesome.com https://code.jquery.com https://cdn.jsdelivr.net;script-src-attr 'unsafe-inline';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests");

	// response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

	// Set Cross-Origin-Opener-Policy header to control how cross-origin content can be opened
	response.setHeader("Cross-Origin-Opener-Policy", "same-origin");

	// Set Cross-Origin-Resource-Policy header to control how cross-origin requests are performed
	response.setHeader("Cross-Origin-Resource-Policy", "same-origin");

	// Set Origin-Agent-Cluster header to indicate if the request supports Origin-Agent-Cluster
	response.setHeader("Origin-Agent-Cluster", "?1");

	// Set Referrer-Policy header to control how much referrer information is sent with requests
	response.setHeader("Referrer-Policy", "no-referrer");

	// Set Strict-Transport-Security header to enforce secure connections over HTTPS
	response.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains");

	// Set X-Content-Type-Options header to prevent content type sniffing
	response.setHeader("X-Content-Type-Options", "nosniff");

	// Set X-DNS-Prefetch-Control header to disable DNS prefetching
	response.setHeader("X-DNS-Prefetch-Control", "off");

	// Set X-Download-Options header to prevent browser from automatically opening downloaded files
	response.setHeader("X-Download-Options", "noopen");

	// Set X-Frame-Options header to control framing of the page
	response.setHeader("X-Frame-Options", "SAMEORIGIN");

	// Set X-Permitted-Cross-Domain-Policies header to restrict cross-domain policy files
	response.setHeader("X-Permitted-Cross-Domain-Policies", "none");

	// Set X-XSS-Protection header to enable Cross-Site Scripting (XSS) protection
	response.setHeader("X-XSS-Protection", "1; mode=block");

	// Call the next middleware function
	next();
};

// Export the setSecurityHeaders middleware function
module.exports = { setSecurityHeaders };
