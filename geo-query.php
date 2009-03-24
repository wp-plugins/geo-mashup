<?php

require_once('../../../wp-blog-header.php');

if ( empty( $_GET['post_ids'] ) ) {
	GeoMashupQuery::generate_location_json( );
} else {
	GeoMashupQuery::generate_post_html( );
}

/**
 * GeoMashupQuery - static class provides namespace 
 */
class GeoMashupQuery {

	function generate_post_html( ) {
		global $geo_mashup_options;

		$post_ids = $_GET['post_ids'];
		if ( !is_array( $post_ids ) ) {
			$post_ids = split( ',', $post_ids );
		}

		query_posts( array( 'post__in' => $post_ids ) );
		if ( !have_posts() && count( $post_ids ) > 0 ) {
			// Hopefully no posts means we're looking for a single page
			// Won't work when multiple posts and pages share a location,
			// then our piggybacking on WP shows its limitations
			query_posts( array( 'page_id' => $post_ids[0] ) );
		}

		if ( have_posts() ) {
			status_header(200);
		}

		if ( empty( $_GET['template'] ) ) {
			$template_base = 'info-window';
		} else {
			$template_base = $_GET['template'];
		}

		$template = locate_template( array("geo-mashup-$template_base.php") );
		if ( empty( $template ) ) {
			$template = $template_base . '.php';
		}
		if ( !is_readable( $template ) ) {
			$template = $template_base . '-default.php';
		}
		if ( !is_readable( $template ) ) {
			$template = 'info-window-default.php';
		}
		load_template( $template );
	}

	function generate_location_json( ) {
		/*
		if ( !empty( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ) {
			$http_time = strtotime( $_SERVER['HTTP_IF_MODIFIED_SINCE'] );
			$mod_time = strtotime( $post->post_modified_gmt . ' GMT' );
			if ($mod_time <= $http_time) {
				return status_header(304); // Not modified
			}
		}

		status_header(200);
		header( 'Last-Modified: ' . mysql2date( 'D, d M Y H:i:s', $post->post_modified_gmt, false ) . ' GMT' );
		header( 'Content-type: text/xml; charset='.get_settings('blog_charset'), true);
		header( 'Cache-control: max-age=300, must-revalidate', true);
		header( 'Expires: ' . gmdate( 'D, d M Y H:i:s', time() + 300 ) . " GMT" );
		header( 'Pragma:' );
		 */
		status_header(200);
		header('Content-type: text/plain; charset='.get_settings('blog_charset'), true);
		header('Cache-Control: no-cache;', true);
		header('Expires: -1;', true);

		echo GeoMashup::get_post_locations_json($_GET);
	}
}
?>
